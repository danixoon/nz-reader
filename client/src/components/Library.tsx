import React from "react";
import { connect } from "react-redux";
import { InputGroup, InputGroupAddon, Button, Input, Card, CardImg, CardBody, CardTitle, CardText, Spinner } from "reactstrap";
import { Search, Star, Heart, List } from "react-feather";

import { fetchLibraryBooks } from "../store/actions/libraryActions";
import { userCartAdd, userCartDelete, userCartFetch } from "../store/actions/userActions";
import CartModal from "./CartModal";
import { CSSTransition } from "react-transition-group";
import OrderModal from "./OrderModal";

import axios from "axios";

class Library extends React.Component<any> {
  state = {
    search: null,
    cartModal: false,
    orderModal: false,
    orderStatus: "IDLE"
  };

  toggleCartModal = () => {
    this.setState((prevState: any) => ({
      cartModal: !prevState.cartModal
    }));
  };

  componentDidMount() {
    this.fetchBooks();
    this.props.userCartFetch();
  }

  fetchBooks = () => {
    const { search } = this.state;
    this.props.fetchLibraryBooks({ search });
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.search !== this.state.search) this.fetchBooks();
    // if (prevState.orderStatus === "LOADING" && this.state.orderStatus === "SUCCESS") this.toggleOrderModal();
  }

  onChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleOrderModal = () => {
    const { orderModal } = this.state;
    this.setState({ orderModal: !orderModal, orderStatus: "IDLE" });
  };

  createOrder = (value: any) => {
    const { cart } = this.props.user.entities;
    this.setState({ orderStatus: "LOADING" });
    axios
      .get("/api/order/create", { params: { ...value, bookIds: cart.map((c: any) => c._id) } })
      .then(() => this.setState({ orderStatus: "SUCCESS" }))
      .catch(err => {
        console.log(err);
        this.setState({ orderStatus: "ERROR" });
      });
  };

  render() {
    const { books } = this.props.library.entities;
    const { cart } = this.props.user.entities;
    const { fetch: fetchBookStatus } = this.props.library.statuses.books;
    const { fetch: fetchCartStatus } = this.props.user.statuses.cart;
    const { cartModal, orderModal, orderStatus } = this.state;

    return (
      <div className="container p-3 flex-grow-1 d-flex flex-column align-items-center">
        {/* <CSSTransition timeout={300} in={cartModal} mountOnEnter unmountOnExit> */}
        <CartModal
          disabled={cart.length === 0}
          open={cartModal}
          toggle={this.toggleCartModal}
          submit={() => {
            this.toggleCartModal();
            if (cart.length > 0) this.toggleOrderModal();
          }}
        />
        {/* </CSSTransition> */}
        {/* <CSSTransition timeout={300} in={orderModal} mountOnEnter unmountOnExit> */}
        <OrderModal
          orderStatus={orderStatus}
          open={orderModal}
          toggle={this.toggleOrderModal}
          submit={(data: any) => {
            this.createOrder(data);
            // this.toggleOrderModal();
          }}
        />
        {/* </CSSTransition> */}
        <div className="row mb-2 w-100 no-gutters ">
          <div className="col">
            <InputGroup>
              <Input name="search" onChange={this.onChange} placeholder="Введите запрос" />
              <InputGroupAddon addonType="append">
                <Button color="danger" onClick={this.toggleCartModal}>
                  <List />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div className="row no-gutters flex-grow-1">
          <div className="col-100 px-0 d-flex flex-column ">
            {fetchBookStatus !== "SUCCESS" || fetchCartStatus !== "SUCCESS" ? <Spinner color="primary" className="m-auto" /> : <BookList books={books} cart={cart} />}
          </div>
        </div>
      </div>
    );
  }
}

export class BookList extends React.Component<{ books: any[]; cart: string[] }> {
  render() {
    const { books, cart } = this.props;
    return (
      <div className="fluid-container row no-gutters d-flex justify-content-around">
        {books.map(b => (
          <Book starred={cart.find((c: any) => c._id === b._id)} key={b._id} className="col-100 col-sm-6 col-md-4" {...b} />
        ))}
      </div>
    );
  }
}

const Book = connect(
  null,
  { userCartAdd, userCartDelete }
)(({ className, userCartAdd, userCartDelete, label, description, author, starred, _id, imageUrl }: any) => (
  <Card className={"p-2 " + className} style={{ maxHeight: "400px" }}>
    <CardImg style={{ objectFit: "cover", overflow: "hidden" }} top width="100%" src={imageUrl} alt="Card image cap" />
    <CardBody className="postition-relative">
      <CardTitle>
        <b>{label}</b>
      </CardTitle>
      <CardText>{description}</CardText>
      <CardText>
        <small className="text-muted">{author}</small>
      </CardText>
      <Button
        className="position-absolute p-1 rounded-pill"
        onClick={() => (starred ? userCartDelete(_id) : userCartAdd(_id))}
        color={starred ? "danger" : ""}
        // outline={starred === undefined}
        style={{ bottom: "0.5rem", right: "0.5rem" }}
      >
        <Heart className={starred === undefined ? "text-muted" : undefined} />
      </Button>
    </CardBody>
  </Card>
));

const mapDispatchToProps = {
  fetchLibraryBooks,
  userCartFetch
};

const mapStateToProps = (state: any) => ({
  library: state.library,
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);

import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import { BookList } from "./Library";
import { connect } from "react-redux";
import { userCartDelete } from "../store/actions/userActions";

class CartModal extends React.Component<any> {
  render() {
    const { toggle, open, user, submit, disabled } = this.props;
    return (
      // <div className="position-relative">
      <CSSTransition in={open} timeout={300} classNames="cart-modal" unmountOnExit>
        {/* <Button>ПУПААА</Button> */}
        <div className="ml-auto mr-0 mt-0 position-absolute bg-white col-md-4 col-lg-3 col-100  shadow-lg" style={{ zIndex: 1050, right: 0, top: `0.5rem` }}>
          <ModalHeader toggle={toggle}>Корзина</ModalHeader>
          <ModalBody>
            {user.statuses.cart.fetch === "SUCCESS" &&
              (user.entities.cart.length === 0 ? (
                <span> Корзина пуста </span>
              ) : (
                user.entities.cart.map((c: any) => {
                  return (
                    <div key={c._id} className="mb-2">
                      <b>{c.label}</b>
                      <button onClick={() => this.props.userCartDelete(c._id)} className="float-right btn text-danger p-1 rounded-pill">
                        &times;
                      </button>
                      <br />
                      <span> {c.description}</span>
                      <br />
                      <small className="text-muted">{c.author}</small>
                    </div>
                  );
                })
              ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" disabled={disabled} className="w-100" onClick={submit}>
              Оформить заказ
            </Button>
          </ModalFooter>
        </div>
      </CSSTransition>
      // </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

const mapDispatchToProps = {
  userCartDelete
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartModal);

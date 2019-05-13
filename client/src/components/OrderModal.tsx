import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Spinner } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import { BookList } from "./Library";
import { connect } from "react-redux";
import { userCartDelete } from "../store/actions/userActions";
import { InputValidateGroup, InputValidate } from "./ValidateInputField";
import joi from "joi";
import { Check } from "react-feather";

class OrderModal extends React.Component<any> {
  state = {
    input: {} as any,
    correct: false
  };

  validated = (correct: boolean, value: any) => {
    this.setState({ correct, input: value });
  };

  render() {
    const { toggle, open, user, submit, orderStatus } = this.props;
    const { correct, input } = this.state;
    return (
      // <div className="position-relative">
      // <CSSTransition in={open && orderStatus !== "SUCCESS"} classNames="order-modal" timeout={1000}>
        <Modal isOpen={open} toggle={toggle}>
          {/* <div className="ml-auto mr-0 mt-0 position-absolute bg-white col-md-4 col-lg-3 col-100  shadow-lg" style={{ zIndex: 1050, right: 0, top: `0.5rem` }}> */}
          <ModalHeader toggle={toggle}>Корзина</ModalHeader>
          <ModalBody>
            <InputValidateGroup validated={this.validated}>
              <InputValidate idleMessage="Обращение к вам" successMessage="Отлично" name="firstName" schema={joi.string().error(e => "Обязательное поле")}>
                <input type="lastName" className="w-100 form-control mt-2" placeholder="Иван" />
              </InputValidate>
              <InputValidate idleMessage="Обращение к вам" successMessage="Отлично" name="lastName" schema={joi.string().error(e => "Обязательное поле")}>
                <input type="firstName" className="w-100 form-control mt-2" placeholder="Иванович" />
              </InputValidate>
              <InputValidate idleMessage="Адрес доставки" successMessage="Отлично" name="address" schema={joi.string().error(e => "Обязательное поле")}>
                <input type="address" className="w-100 form-control mt-2" placeholder="г. Далеко, ул. Поближе, д. Здесь, кв. Тут" />
              </InputValidate>
              <InputValidate idleMessage="Ваша почта" successMessage="Отлично" name="email" schema={joi.string().error(e => "Обязательное поле")}>
                <input type="email" className="w-100 form-control mt-2" placeholder="sombody@once.told" />
              </InputValidate>
            </InputValidateGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              disabled={!correct || orderStatus === "LOADING"}
              className="w-100"
              onClick={() =>
                orderStatus === "SUCCESS"
                  ? toggle()
                  : (() => {
                      this.setState({ correct: false });
                      submit(input);
                    })()
              }
            >
              {orderStatus === "LOADING" ? <Spinner size="sm" color="white" /> : orderStatus === "SUCCESS" ? <Check className="text-light" /> : "Завершить"}
            </Button>
          </ModalFooter>
        </Modal>
      // </CSSTransition>
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
)(OrderModal);

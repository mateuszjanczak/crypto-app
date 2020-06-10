import React from "react";
import styled from "styled-components";

class Modal extends React.Component {

    state = {
        coinId: '',
        amount: '',
        date: '',
        price: ''
    };

    afterHandle = () => {
        const { toggleModalFn } = this.props;
        toggleModalFn();
    };

    handleClickAdd = () => {
        const { addItemFn } = this.props;
        addItemFn(this.state);
        this.afterHandle();
    };

    handleClickEdit = () => {
        //const { editNoteFn } = this.props;
        //const { id } = this.props.match.params;
        //editNoteFn(id, this.state);
        this.afterHandle();
    };

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        );
    };

    render() {
        const { toggleModalFn } = this.props;

        const ActionAdd = () => {
            return (
                <Action onClick={this.handleClickAdd}>Add</Action>
            )
        };

        const ActionEdit = () => {
            return (
                <Action onClick={this.handleClickEdit}>Edit</Action>
            )
        };


        return (
            <Wrapper>
                <Container>
                    <ActionClose onClick={toggleModalFn}>
                        <Button>
                            X
                        </Button>
                    </ActionClose>
                    <Form>
                        <div>
                            <p>Kryptowaluta</p>
                            <Input onChange={this.handleChange} name="coinId" value={this.state.coinId} />
                        </div>
                        <div>
                            <p>Ilość</p>
                            <Input type="number" onChange={this.handleChange} name="amount" value={this.state.amount} />
                        </div>
                        <div>
                            <p>Data kupna</p>
                            <Input type="date" onChange={this.handleChange} name="date" value={this.state.date} />
                        </div>
                        <div>
                            <p>Cena</p>
                            <Input type="number" onChange={this.handleChange} name="price" value={this.state.price} />
                        </div>
                        {this.props.typeFn === "add" && <ActionAdd/>}
                        {this.props.typeFn === "edit" && <ActionEdit/>}
                    </Form>
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 1rem;
  background: #1F1B24;
  border: 1px solid black;
`;

const Form = styled.div`
  padding: 2.5rem 5rem;
  text-align: center;
  display: grid;
  grid-gap: 1rem;
`;

const ActionClose = styled.div`
  display: grid;
  justify-content: right;
  grid-template-columns: repeat(auto-fit, 4rem);
  margin-bottom: -4rem;
`;

const Input = styled.input`
  width: 30rem;
  height: 1.5rem;
  margin-bottom: 0.5rem;
  background: #121212;
  border: none;
  border-bottom: 0.5rem solid #332940;
  padding: 2rem;
  color: white;
`;

const Button = styled.button`
  display: inline;
  background: none;
  border: 1px solid #332940;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  padding: 1rem;
  &:hover {
    background: #332940;
  }
`;

const Action = styled(Button)`
  margin-top: 2rem;
`;

export default Modal;
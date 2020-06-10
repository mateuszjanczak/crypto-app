import React from "react";
import styled from "styled-components";
import AuthenticationService from "../../../service/AuthenticationService";

class Modal extends React.Component {

    state = {
        listCrypto: [],
        listNormal: ['USD', 'EUR', 'PLN', 'GBP'],
        loaded: false,
        name: '',
        coinId: '',
        amount: '',
        date: '',
        price: '',
        currency: ''
    };

    componentDidMount() {
        const { typeFn } = this.props;
        if(typeFn === 'edit'){
            const { item } = this.props;
            this.setState({
                ...item[0],
                date: item[0].date.substring(0, 10)
            });
        }

        fetch("http://localhost:3001/api/converter/list", {
            headers: {
                'auth-token': AuthenticationService.getHeaders()
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ...this.state,
                        listCrypto: result,
                        loaded: true
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    afterHandle = () => {
        const { toggleModalFn } = this.props;
        toggleModalFn();
    };

    handleClickAdd = () => {
        const { addItemFn } = this.props;
        const { name, amount, date, price, currency } = this.state;
        const coinId = this.state.listCrypto.find((item) => item.name === name).id;
        addItemFn({
            coinId,
            amount,
            date,
            price,
            currency
        });
        this.afterHandle();
    };

    handleClickEdit = () => {
        const { editItemFn } = this.props;
        const { name, amount, date, price, currency } = this.state;
        const coinId = this.state.listCrypto.find((item) => item.name === name).id;
        editItemFn({
            coinId,
            amount,
            date,
            price,
            currency
        });
        this.afterHandle();
    };

    handleClickDelete = () => {
        const { deleteItemFn } = this.props;
        deleteItemFn();
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

    renderElement(item) {
        return (
            <option key={item.id}>{item.name}</option>
        );
    };

    renderOption = (item) => {
        return (
            <option key={item} value={item}>{item}</option>
        );
    };

    render() {
        const { toggleModalFn } = this.props;

        const ActionAdd = () => {
            return (
                <Button onClick={this.handleClickAdd}>Add</Button>
            )
        };

        const ActionEdit = () => {
            return (
                <Actions>
                    <Button onClick={this.handleClickEdit}>Edit</Button>
                    <Button onClick={this.handleClickDelete}>Delete</Button>
                </Actions>
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
                        <datalist id="crypto">
                            {this.state.loaded && this.state.listCrypto.map(this.renderElement)}
                        </datalist>
                        <div>
                            <Input type="text" list="crypto" onChange={this.handleChange} name="name" value={this.state.name} placeholder="Wybierz kryptowalutę"/>
                        </div>
                        <div>
                            <Input type="number" onChange={this.handleChange} name="amount" value={this.state.amount} placeholder="Ilość"/>
                        </div>
                        <div>
                            <Input type="text" onFocus={(e) => e.target.type = 'date'} onChange={this.handleChange} name="date" value={this.state.date} placeholder="Data kupna" />
                        </div>
                        <div>
                            <Price type="number" onChange={this.handleChange} name="price" value={this.state.price} placeholder="Cena"/>
                            <Select onChange={this.handleChange} name="currency" value={this.state.currency}>
                                {this.state.listNormal.length > 1 && this.state.listNormal.map(this.renderOption)}
                            </Select>
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
  grid-gap: 3rem;
`;

const ActionClose = styled.div`
  display: grid;
  justify-content: right;
  grid-template-columns: repeat(auto-fit, 4rem);
  margin-bottom: -2rem;
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

const Price = styled(Input)`
  width: 22rem;
  margin-right: 1rem;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const Select = styled.select`
  padding: 1.15rem;
  background: #121212;
  border: none;
  color: white;
  border-bottom: 0.5rem solid #332940;
`;

export default Modal;
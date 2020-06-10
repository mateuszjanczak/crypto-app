import React from "react";
import styled from "styled-components";
import Modal from "../components/Crypto/Wallet/Modal";
import AuthenticationService from "../service/AuthenticationService";

class Wallet extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenModal: false,
            items: [],
            type: 'add'
        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        fetch("http://localhost:3001/api/purchases", {
            headers: {
                'auth-token': AuthenticationService.getHeaders()
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ...this.state,
                        items: result
                    });
                    console.log(this.state.items)
                },
                (error) => {
                    console.log(error)
                }
            )
    };

    toggleModal = () => {
        this.setState({
            ...this.state,
            isOpenModal: !this.state.isOpenModal
        });
    };

    toggleAdd = () => {
        this.setState({
            ...this.state,
            type: 'add'
        }, () => {
            this.toggleModal();
        });
    };

    toggleEdit = () => {
        this.setState({
            ...this.state,
            type: 'edit'
        }, () => {
            this.toggleModal();
        });
    };

    addItem = (item) => {
        fetch('http://localhost:3001/api/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': AuthenticationService.getHeaders()
            },
            body: JSON.stringify({
                ...item,
                currency: 'USD'
            }),
        }).then(() => { this.fetchItems() })
    };

    renderPercent = (item) => {
        const color = item > 0 ? '#5BFF62' : item < 0 ? '#FE634E' : '#BCBEC0';
        const sign = item > 0 ? '+' : '';
        return (
            <Percent color={color}>{sign}{item.toFixed(2)}%</Percent>
        );
    };

    renderElement = (item) => {
        const {amount, price, date, currency, name, percent, profit} = item;
        return (
            <Box>
                <Paragraph>{name}</Paragraph>
                <Paragraph>{amount}</Paragraph>
                <Paragraph>{price + ' ' + currency}</Paragraph>
                <Paragraph>{date.slice(0, 10).split('-').reverse().join(' / ')}</Paragraph>
                {this.renderPercent(percent)}
                <Paragraph>{profit.toFixed(2) + ' ' + currency}</Paragraph>
            </Box>

        );
    };

    render() {

        const Form = () => {
            return (
                <>
                {this.state.type === 'add' && <Modal toggleModalFn={this.toggleModal} typeFn={'add'} addItemFn={this.addItem}/>}
                {this.state.type === 'edit' && <Modal toggleModalFn={this.toggleModal} typeFn={'edit'} />}
                </>
            )
        };

        return (
            <Wrapper>
                {this.state.isOpenModal && <Form />}
                <Button onClick={this.toggleAdd}>+</Button>
                <Container>
                    <Box>
                        <Heading>Kryptowaluta</Heading>
                        <Heading>Ilość</Heading>
                        <Heading>Cena</Heading>
                        <Heading>Data</Heading>
                        <Heading>%</Heading>
                        <Heading>Profit</Heading>
                    </Box>
                    {this.state.items.length > 0 && <> {this.state.items.map(this.renderElement)} </>}
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-rows: 3rem 1fr;
  grid-gap: 3rem;
`;

const Container = styled.div`
  background: #1F1B24;
  padding: 1.5rem;

`;

const Button = styled.button`
  width: 4rem;
  height: 4rem;
  justify-self: right;
  background: none;
  border: 1px solid #332940;
  display: grid;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  &:hover {
    background: #332940;
  }
`;

const Heading = styled.p`
  text-align: center;
  font-weight: 700;
`;

const Paragraph = styled.p`
  text-align: center;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 1rem;
  border-top: 1px solid black;
  &:first-child {
    border-top: none;
  }
`;

const Percent = styled.p`
  color: ${props => (props.color ? props.color : 'white')};
  font-weight: 500;
  text-align: center;
`;

export default Wallet;
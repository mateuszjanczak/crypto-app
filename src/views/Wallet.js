import React from "react";
import styled from "styled-components";
import Modal from "../components/Crypto/Wallet/Modal";
import AuthenticationService from "../service/AuthenticationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faEdit} from "@fortawesome/free-solid-svg-icons";
import NotificationsForm from "../components/Crypto/Wallet/NotificationsForm";
import ApiService from "../service/ApiService";

class Wallet extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenModal: false,
            isOpenNotificationsForm: false,
            items: [],
            type: 'add',
            _id: ''
        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        fetch(`${ApiService.api}/api/purchases`, {
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

    toggleNotificationsForm = () => {
        this.setState({
            ...this.state,
            isOpenNotificationsForm: !this.state.isOpenNotificationsForm
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

    toggleEdit = (_id) => {
        this.setState({
            ...this.state,
            type: 'edit',
            item: this.state.items.filter((item) => item._id === _id),
            _id
        }, () => {
            this.toggleModal();
        });
    };

    toggleBell = (_id) => {
        this.setState({
            ...this.state,
            item: this.state.items.filter((item) => item._id === _id),
            _id
        }, () => {
            this.toggleNotificationsForm();
        });
    };

    addItem = (item) => {
        fetch(`${ApiService.api}/api/purchases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': AuthenticationService.getHeaders()
            },
            body: JSON.stringify({
                ...item
            }),
        }).then(() => { this.fetchItems() })
    };

    editItem = (item) => {
        const { _id } = this.state;
        fetch(`${ApiService.api}/api/purchases/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': AuthenticationService.getHeaders()
            },
            body: JSON.stringify({
                ...item
            }),
        }).then(() => { this.fetchItems() })
    };

    deleteItem = () => {
        const { _id } = this.state;
        fetch(`${ApiService.api}/api/purchases/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': AuthenticationService.getHeaders()
            }
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
        const {_id, amount, price, date, currency, name, percent, profit} = item;
        return (
            <Box>
                <Paragraph>{name}</Paragraph>
                <Paragraph>{amount}</Paragraph>
                <Paragraph>{price + ' ' + currency}</Paragraph>
                <Paragraph>{date.slice(0, 10).split('-').reverse().join(' / ')}</Paragraph>
                {this.renderPercent(percent)}
                <Paragraph>{profit.toFixed(2) + ' ' + currency}</Paragraph>
                <Operation>
                    <EditButton onClick={() => this.toggleEdit(_id)}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </EditButton>
                    <EditButton onClick={() => this.toggleBell(_id)}>
                        <FontAwesomeIcon icon={faBell}/>
                    </EditButton>
                </Operation>
            </Box>
        );
    };

    render() {

        const Form = () => {
            return (
                <>
                {this.state.type === 'add' && <Modal toggleModalFn={this.toggleModal} typeFn={'add'} addItemFn={this.addItem}/>}
                {this.state.type === 'edit' && <Modal toggleModalFn={this.toggleModal} _id={this.state._id} item={this.state.item} typeFn={'edit'} editItemFn={this.editItem} deleteItemFn={this.deleteItem} />}
                </>
            )
        };

        return (
            <Wrapper>
                {this.state.isOpenModal && <Form />}
                {this.state.isOpenNotificationsForm && <NotificationsForm toggleNotificationsFormFn={this.toggleNotificationsForm} id={this.state._id} item={this.state.item} />}
                <Button onClick={this.toggleAdd}>
                    +
                </Button>
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
                    {this.state.items.length === 0 && <Warning>Lista jest pusta.</Warning>}
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

`;

const Operation = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
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

const EditButton = styled(Button)`
  width: 2.75rem;
  height: 2.75rem;
  justify-self: center;
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
  grid-template-columns: repeat(6, 1fr) 6rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: #1F1B24;
`;

const Percent = styled.p`
  color: ${props => (props.color ? props.color : 'white')};
  font-weight: 500;
  text-align: center;
`;

const Warning = styled.p`
  text-align: center;
`;

export default Wallet;
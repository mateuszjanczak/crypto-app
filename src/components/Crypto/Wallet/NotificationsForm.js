import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from "../../../service/AuthenticationService";
import ApiService from "../../../service/ApiService";

class NotificationsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'percent',
            valuePrice: '',
            valuePercent: '',
            id: '',
            currentPrice: '',
            percent: ''
        };
    }

    componentDidMount() {
        const { item, id } = this.props;
        this.setState({
            ...this.state,
            id,
            currentPrice: item[0].currentPrice,
            percent: item[0].percent
        });
    }

    afterHandle = () => {
        const { toggleNotificationsFormFn } = this.props;
        toggleNotificationsFormFn();
    };

    handleClickAdd = () => {
        const { type, currentPrice, percent, valuePrice, valuePercent, id } = this.state;
        let status, value;

        if(type === 'money') {
            status = valuePrice > currentPrice ? 1 : 0;
            //status = valuePrice > currentPrice ? 0 : 1; // for testing
            value = valuePrice;
        } else {
            status = valuePercent > percent ? 1 : 0;
            //status = valuePercent > percent ? 0 : 1; // for testing
            value = valuePercent;
        }

        fetch(`${ApiService.api}/api/notifications/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': AuthenticationService.getHeaders()
            },
            body: JSON.stringify({
                type,
                value,
                id,
                status
            }),
        });
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

    handleChangeRadio = (event) => {
        this.setState(
            {
                [event.target.name]
                    :event.target.value,
                valuePrice: this.state.currentPrice,
                valuePercent: this.state.percent
            }
        );
    };

    render() {
        const { toggleNotificationsFormFn } = this.props;

        return (
            <Wrapper>
                <Container>
                    <ActionClose onClick={toggleNotificationsFormFn}>
                        <Button>
                            <FontAwesomeIcon icon={faTimes}/>
                        </Button>
                    </ActionClose>
                    <Form>
                        <div>
                            <h1>Typ notyfikacji</h1>
                            <Label>
                                <input type="radio" onChange={this.handleChangeRadio} name="type" value="percent" /> Procent
                            </Label>

                            <Label>
                                <input type="radio" onChange={this.handleChangeRadio} name="type" value="money" /> Wartość
                            </Label>
                        </div>
                        {this.state.type === 'money' && <div>
                            <Input type="number" onChange={this.handleChange} name="valuePrice" value={this.state.valuePrice} placeholder="Wartość"/>
                        </div>}
                        {this.state.type === 'percent' &&
                        <div>
                            <Input type="number" onChange={this.handleChange} name="valuePercent" value={this.state.valuePercent} placeholder="Wartość w %"/>
                        </div>}
                        <Button onClick={this.handleClickAdd}>Ustaw powiadomienie</Button>
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

const Label = styled.label`
  padding: 1rem;
`;

export default NotificationsForm;
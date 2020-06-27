import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from "../service/AuthenticationService";
import { Redirect } from 'react-router';
import {routes} from "../routes";

class ResetPassword extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            error: '',
            referrer: ''
        };
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    :event.target.value,
                error: ''
            }
        )
    };

    handleBack = () => {
        this.setState({
            ...this.state,
            referrer: routes.login
        });
    };

    handleForget = () => {
        const { email } = this.state;

        fetch('http://localhost:3001/api/user/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': AuthenticationService.getHeaders()
            },
            body: JSON.stringify({
                email
            }),
        })
        .then(res => {
            return res.text().then(text => {throw new Error(text)})
        })
        .catch((e) => {
            this.setState({
                ...this.state,
                error: e.message
            });
        })
    };

    render() {
        return (
            <Wrapper>
                <Box>
                    <ActionClose onClick={this.handleBack}>
                        <Button>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </Button>
                    </ActionClose>
                    <Form>
                        <Heading>Przypomnienie hasła</Heading>
                        {this.state.error && <div>{this.state.error}</div>}
                        <Input placeholder="Adres email" name="email" value={this.state.email} onChange={this.handleChange} />
                        <Button onClick={this.handleForget}>Wyślij</Button>
                    </Form>
                    {this.state.referrer && <Redirect to={this.state.referrer} />}
                </Box>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Box = styled.div`
  background: #1F1B24;
  padding: 2rem;
  display: grid;
  grid-gap: 2rem;
`;

const Form = styled.div`
  padding: 0 5rem;
  text-align: center;
  display: grid;
  grid-gap: 3rem;
`;

const ActionClose = styled.div`
  display: block;
  width: 4rem;
  height: 4rem;
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

const Heading = styled.h2`
  margin: -4rem 0 0;
  text-align: center;
`;

export default ResetPassword;

import React from "react";
import styled from "styled-components";
import AuthenticationService from "../../../service/AuthenticationService";
import { withRouter } from 'react-router-dom';
import {routes} from "../../../routes";
import ApiService from "../../../service/ApiService";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            hasRegisterFailed: '',
            error: ''
        };
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        )
    };

    registerClicked = () => {
        const { email, username, password, repeatPassword } = this.state;

        if(!(email && username && password && repeatPassword)){
            this.setState({
                ...this.state,
                hasRegisterFailed: true,
                error: "Uzupełnij wszystkie pola"
            });
            return 0
        }

        if(password !== repeatPassword){
            this.setState({
                ...this.state,
                hasRegisterFailed: true,
                error: "Hasła do siebie nie pasują"
            });
            return 0
        }

        if(password.length < 8){
            this.setState({
                ...this.state,
                hasRegisterFailed: true,
                error: "Hasło jest zbyt trywialne"
            });
            return 0
        }

        fetch(`${ApiService.api}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                password
            }),
        })
        .then((response) => {
            if(response.ok) {
                return this.authenticate(username, password);
            }
            return response.text().then(text => {throw new Error(text)})
        })
        .catch((e) => {
            this.setState({
                ...this.state,
                hasRegisterFailed: true,
                error: e.message
            });
        })
    };

    authenticate = (username, password) => {
        AuthenticationService
            .executeJwtAuthenticationService(username, password)
            .then(res => {
                if(res.ok) {
                    return res.headers.get('auth-token')
                }
                return res.text().then(text => {throw new Error(text)})
            })
            .then(token => {
                AuthenticationService.registerSuccessfulLoginForJwt(username, token);
                this.toHomepage();
            })
    };

    toHomepage = () => {
        this.props.history.push(routes.homepage)
    };

    render() {
        return (
            <Wrapper>
                {this.state.hasRegisterFailed && <div>{this.state.error}</div>}
                <Input type="email" placeholder="Adres email" name="email" value={this.state.email} onChange={this.handleChange} />
                <Input placeholder="Nazwa użytkownika" name="username" value={this.state.username} onChange={this.handleChange} />
                <Input type="password" placeholder="Hasło" name="password" value={this.state.password} onChange={this.handleChange} />
                <Input type="password" placeholder="Powtórz hasło" name="repeatPassword" value={this.state.repeatPassword} onChange={this.handleChange} />
                <Button onClick={this.registerClicked}>Zarejestruj</Button>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

const Input = styled.input`
  width: 50rem;
  height: 5rem;
  margin-bottom: 1.5rem;
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
  padding: 1.5rem;
  &:hover {
    background: #332940;
  }
`;

export default withRouter(RegisterForm);
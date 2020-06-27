import React from "react";
import styled from "styled-components";
import LoginForm from "../components/Crypto/Login/LoginForm";
import RegisterForm from "../components/Crypto/Login/RegisterForm";
import AuthenticationService from "../service/AuthenticationService";

class Authentication extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loginEnabled: true,
            registerEnabled: false
        };
    }

    componentDidMount() {
        AuthenticationService.logout();
    }

    render() {
        const handleClickLogin = () => {
            this.setState({
                loginEnabled: true,
                registerEnabled: false
            })
        };

        const handleClickRegister = () => {
            this.setState({
                loginEnabled: false,
                registerEnabled: true
            })
        };

        return (
            <Wrapper>
                <Box>
                    <Switches>
                        <Button onClick={handleClickLogin} active={this.state.loginEnabled}>Logowanie</Button>
                        <Button onClick={handleClickRegister} active={this.state.registerEnabled}>Rejestracja</Button>
                    </Switches>
                    {this.state.loginEnabled && <LoginForm />}
                    {this.state.registerEnabled && <RegisterForm />}
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

const Switches = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
`;

const Button = styled.button`
  display: inline;
  border: 1px solid #332940;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  padding: 1.5rem;
  background: ${props => (props.active ? '#332940' : 'none')}
`;

export default Authentication;

import React from "react";
import styled from "styled-components";
import AuthenticationService from "../service/AuthenticationService";

class Settings extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            old: '',
            new: '',
            repeat_new: '',
            pass: '',
            mail: '',
            passErr: '',
            emailErr: ''
        };
    }

    handleMail = () => {
        const { pass: password, mail: newEmail } = this.state;

        this.clearErrors()
            .then( () => {
                if(!(password && newEmail)){
                    this.setState({
                        ...this.state,
                        emailErr: "Uzupełnij wszystkie pola"
                    });
                    return 0
                }

                fetch('http://localhost:3001/api/user/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': AuthenticationService.getHeaders()
                    },
                    body: JSON.stringify({
                        password,
                        newEmail
                    }),
                })
                    .then(res => {
                        return res.text().then(text => {throw new Error(text)})
                    })
                    .catch((e) => {
                        this.setState({
                            ...this.state,
                            emailErr: e.message
                        });
                    })
            });
    };

    handlePassword = () => {
        const { old: password, new: newPassword, repeat_new } = this.state;

        this.clearErrors().then(() => {
            if(!(password && newPassword)){
                this.setState({
                    ...this.state,
                    passErr: "Uzupełnij wszystkie pola"
                });
                return 0
            }

            if(newPassword === repeat_new){
                fetch('http://localhost:3001/api/user/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': AuthenticationService.getHeaders()
                    },
                    body: JSON.stringify({
                        password,
                        newPassword
                    }),
                })
                    .then(res => {
                        return res.text().then(text => {throw new Error(text)})
                    })
                    .catch((e) => {
                        this.setState({
                            ...this.state,
                            passErr: e.message
                        });
                    })
            } else {
                this.setState({
                    ...this.state,
                    passErr: 'Wpisane hasła nie są takie same'
                });
            }
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]
                :event.target.value
        }, this.clearErrors);
    };

    clearErrors = () => {
        return new Promise((resolve) =>
            this.setState({
                ...this.state,
                passErr: '',
                emailErr: ''
            }, resolve)
        )
    };

    render() {
        return (
            <Wrapper>
                <Box>
                    <Heading>Zmiana hasła</Heading>
                    {this.state.passErr && <p>{this.state.passErr}</p>}
                    <Input type="password" placeholder="Stare hasło" name="old" value={this.state.old} onChange={this.handleChange} />
                    <Input type="password" placeholder="Nowe hasło" name="new" value={this.state.new} onChange={this.handleChange} />
                    <Input type="password" placeholder="Powtórz hasło" name="repeat_new" value={this.state.repeat_new} onChange={this.handleChange} />
                    <Button onClick={this.handlePassword}>Zmień hasło</Button>
                </Box>
                <Box>
                    <Heading>Zmiana emaila</Heading>
                    {this.state.emailErr && <p>{this.state.emailErr}</p>}
                    <Input type="password" placeholder="Hasło" name="pass" value={this.state.pass} onChange={this.handleChange} />
                    <Input placeholder="Nowy adres email" name="mail" value={this.state.mail} onChange={this.handleChange} />
                    <Button onClick={this.handleMail}>Zmień email</Button>
                </Box>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: grid;
  padding: 3rem;
  grid-template-rows: 1/3fr 2/3fr;
  justify-items: center;
  align-items: center;
`;

const Box = styled.div`
  display: grid;
  padding: 2rem;
  background: #1F1B24;
`;

const Input = styled.input`
  width: 50rem;
  height: 2.5rem;
  margin-bottom: 1.5rem;
  background: #121212;
  border: none;
  border-bottom: 0.5rem solid #332940;
  padding: 2rem;
  color: white;
`;

const Button = styled.button`
  display: inline;
  width: 50rem;
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
  margin: 0 0 1.5rem;
  text-align: center;
`;

export default Settings;
import React from "react";
import styled from "styled-components";

class Settings extends React.Component {

    state = {
        old: '',
        new: '',
        repeat_new: '',
        pass: '',
        mail: '',
        passErr: '',
        emailErr: ''
    };

    handlePassword = () => {

    };

    handleMail = () => {

    };

    render() {
        return (
            <Wrapper>
                <Box>
                    {this.state.passErr && <p>{this.state.passErr}</p>}
                    <Input placeholder="Stare hasło" name="old" value={this.state.old} onChange={this.handleChange} />
                    <Input type="password" placeholder="Nowe hasło" name="new" value={this.state.new} onChange={this.handleChange} />
                    <Input type="password" placeholder="Powtórz hasło" name="repeat_new" value={this.state.repeat_new} onChange={this.handleChange} />
                    <Button onClick={this.handlePassword}>Zmień hasło</Button>
                </Box>
                <Box>
                    {this.state.emailErr && <p>{this.state.emailErr}</p>}
                    <Input placeholder="Hasło" name="pass" value={this.state.pass} onChange={this.handleChange} />
                    <Input type="password" placeholder="Nowy adres email" name="mail" value={this.state.mail} onChange={this.handleChange} />
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

export default Settings;
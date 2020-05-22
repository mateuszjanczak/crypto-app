import React from "react";
import { Redirect } from 'react-router'
import styled from "styled-components";
import {routes} from "../routes";

class Init extends React.Component {

    state = {
        referrer: null
    };

    user = () => {
        this.setState({
            referrer: routes.login
        });
    };

    guest = () => {
        this.setState({
            referrer: routes.homepage
        });
    };

    render() {
        return (
            <Wrapper>
                <Box>
                    <h1>Aplikacja do śledzenia kryptowalut</h1>
                    <Switches>
                        <Button onClick={this.user}>Użytkownik</Button>
                        <Button onClick={this.guest}>Gość</Button>
                    </Switches>
                </Box>
                {this.state.referrer && <Redirect to={this.state.referrer} />}
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
  padding: 10rem;
  display: grid;
  align-items: center;
  justify-items: center;
`;

const Switches = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
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

export default Init;

//        <Redirect to={routes.homepage} />
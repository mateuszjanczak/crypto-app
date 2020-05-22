import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router'
import styled from "styled-components";
import GlobalStyle from "theme";
import {routes} from "./routes";
import Dashboard from "./views/Dashboard";
import Init from "./views/Init";
import Login from "./views/Login";

const Wrapper = styled.div`
  min-height: calc(100vh - 5rem);
`;

class App extends React.Component {

    state = {
        toDashboard: false,
        currentUser: null
    };

    toDashboard = () => {
        this.setState({
            ...this.state,
            toDashboard: true
        })
    };

    render() {
        if (!this.state.toDashboard) {
            this.toDashboard();
            return (
                <BrowserRouter>
                    <Redirect to={routes.init}/>
                </BrowserRouter>
            );
        }

        return (
            <BrowserRouter>
                <GlobalStyle/>
                <Wrapper>
                    <Switch>
                        <Route path={routes.init} component={Init} />
                        <Route path={routes.login} component={Login} />
                        <Route path={routes.homepage} component={Dashboard} />
                    </Switch>
                </Wrapper>
            </BrowserRouter>
        );
    }
}

export default App;

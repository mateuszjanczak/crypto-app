import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router'
import styled from "styled-components";
import GlobalStyle from "theme";
import {routes} from "./routes";
import Dashboard from "./views/Dashboard";
import Init from "./views/Init";
import Login from "./views/Login";
import ResetPassword from "./views/ResetPassword";

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            toDashboard: false,
            currentUser: null
        };
    }

    toDashboard = () => {
        this.setState({
            ...this.state,
            toDashboard: true
        })
    };

    componentDidMount() {
        this.toDashboard();
    }

    render() {

        return (
            <BrowserRouter>
                {this.state.toDashboard && <Redirect to={routes.init} />}
                <GlobalStyle/>
                <Wrapper>
                    <Switch>
                        <Route path={routes.init} component={Init} />
                        <Route path={routes.login} component={Login} />
                        <Route path={routes.forgetPassword} component={ResetPassword} />
                        <Route path={routes.homepage} component={Dashboard} />
                    </Switch>
                </Wrapper>
            </BrowserRouter>
        );
    }
}

const Wrapper = styled.div`
  min-height: calc(100vh - 5rem);
`;

export default App;

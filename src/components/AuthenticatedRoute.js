import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from "../service/AuthenticationService";
import {routes} from "../routes";

class AuthenticatedRoute extends Component {

    render() {
        if(AuthenticationService.isLogged()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to={routes.login} />
        }
    }
}

export default AuthenticatedRoute
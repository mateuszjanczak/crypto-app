import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import {routes} from "routes";
import Sidebar from "../components/Sidebar";
import CryptoList from "./CryptoList";
import CryptoSingle from "./CryptoSingle";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import Converter from "./Converter";
import Wallet from "./Wallet";
import Settings from "./Settings";

const Container = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  min-height: 100vh;
`;

const Dashboard = () => {
    return (
        <Container>
            <Sidebar />
            <Switch>
                <Route exact path={routes.cryptoSingle} component={CryptoSingle} />
                <Route exact path={routes.crypto} component={CryptoList} />
                <Route exact path={routes.converter} component={Converter} />
                <AuthenticatedRoute exact path={routes.wallet} component={Wallet} />
                <AuthenticatedRoute exact path={routes.settings} component={Settings} />
            </Switch>
        </Container>
    )
};

export default Dashboard;
import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import {routes} from "routes";
import Sidebar from "../components/Sidebar";
import Crypto from "./Crypto";

const Container = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  background: #121212;
  min-height: 100vh;
`;

const Dashboard = () => {
    return (
        <Container>
            <Sidebar />
            <Switch>
                <Route path={routes.crypto} component={Crypto} />
            </Switch>
        </Container>
    )
};

export default Dashboard;
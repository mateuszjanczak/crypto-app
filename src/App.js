import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "theme";
import {routes} from "./routes";
import Dashboard from "./views/Dashboard";

const Wrapper = styled.div`
  min-height: calc(100vh - 5rem);
`;

function App() {
  return (
      <BrowserRouter>
          <GlobalStyle />
          <Wrapper>
              <Switch>
                  <Route path={routes.homepage} component={Dashboard} />
              </Switch>
          </Wrapper>
      </BrowserRouter>
  );
}

export default App;

import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {routes} from "../routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from "../service/AuthenticationService";

class Sidebar extends React.Component {

    logout = () => {
        AuthenticationService.logout();
    };

    render() {
        return (
            <Wrapper>
                <Heading>Aplikacja do śledzenia kryptowalut</Heading>
                <List>
                    <Element>
                        <Link as={NavLink} to={routes.cryptoList}>Przegląd kryptowalut</Link>
                    </Element>
                    <Element>
                        <Link as={NavLink} to={routes.converter}>Przelicznik walutowy</Link>
                    </Element>
                    <Element>
                        <Link as={NavLink} to={routes.wallet}>Portfel</Link>
                    </Element>
                </List>
                <List>
                    <Settings>
                        <Set as={NavLink} to={routes.settings}>
                            <FontAwesomeIcon icon={faCog}/>
                        </Set>
                        <Set onClick={this.logout} as={NavLink} to={routes.init}>
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                        </Set>
                    </Settings>
                </List>
            </Wrapper>
        )

    }
}

const Wrapper = styled.div`
  height: 100vh;
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  background: #1F1B24;
  display: grid;
  grid-template-rows: 15rem 1fr 5rem;
`;

const Heading = styled.h1`
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Element = styled.li`
  padding: 1rem;
`;

const Link = styled.button`
  display: block;
  color: white;
  text-decoration: none;
  padding: 14px 16px;
  
  &:hover {
    background-color: #111;;
  }
  
  &.active {
    background: #332940;
  }
`;

const Settings = styled(Element)`
  text-align: right;
`;

const Set = styled(Link)`
  display: unset;
  &.active {
    background: none;
  }
`;

export default Sidebar;
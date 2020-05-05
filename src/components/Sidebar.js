import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {routes} from "../routes";

const Wrapper = styled.div`
  background: #1F1B24;
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
  //background: #332940;
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

const Sidebar = () => {

    return (
        <Wrapper>
            <Heading>Aplikacja do śledzenia kryptowalut</Heading>
            <List>
                <Element>
                    <Link as={NavLink} to={routes.crypto}>Przegląd kryptowalut</Link>
                </Element>
                <Element>
                    <Link as={NavLink} to={routes.converter}>Przelicznik walutowy</Link>
                </Element>
            </List>
        </Wrapper>
    )

};

export default Sidebar;
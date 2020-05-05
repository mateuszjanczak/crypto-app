import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: #333;
  display: flex;
  justify-content: space-between;
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

const NavListItem = styled.li`

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
    //text-decoration: underline;
  }
`;

const Navbar = () => {
    return (
        <Nav>
            <NavList>
                <NavListItem>
                    <Link as={NavLink} to="/notes">Notes</Link>
                </NavListItem>
            </NavList>
        </Nav>
    )
};

export default Navbar;

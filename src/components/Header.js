import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        {/* <img src="./images/logo.jpeg" alt="my logo img"  /> */}
        <div class="logo">
          <h1 class="logo-text">
            <span>Jayswal</span>Store
          </h1>
        </div>
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 11rem;
    ${'' /* float: left; */}
    margin-right: 2rem;
    ${'' /* height: inherit; */}
  }
  .logo-text {
    margin: 9px;
    font-family: 'Candal', serif;
    color: #8490ff;
  }
  .logo-text span {
    color: #8490ff;
  }
  
`;
export default Header;

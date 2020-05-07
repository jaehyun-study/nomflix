import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const HeaderColumn = styled.div``;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  background-color: ${(props) =>
    props.current ? "rgba(52, 152, 219, 0.2)" : "inherit"};
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: background-color 0.5s ease-in-out, border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ALink = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExtItem = styled(Item)`
  width: 100px;
  margin-right: 12px;
`;

const WeTubeLink = styled(ALink)`
  font-size: 20px;
  font-family: "Leckerli One", cursive;
  &:hover {
    color: #e74c3c;
  }
`;

const RemoteJobsLink = styled(ALink)`
  font-size: 20px;
  font-family: "Pacifico", cursive;
  &:hover {
    text-decoration: underline;
  }
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <HeaderColumn>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">Movies</SLink>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">TV</SLink>
        </Item>
        <Item current={pathname === "/search"}>
          <SLink to="/search">Search</SLink>
        </Item>
        <Item>
          <ALink
            href="https://delphiforwin.blogspot.com/2020/03/nomadcoders-academy-challenges.html"
            target="_blank"
          >
            Blog
          </ALink>
        </Item>
      </List>
    </HeaderColumn>
    <HeaderColumn>
      <List>
        <ExtItem>
          <WeTubeLink
            href="https://wetube-youtube-clone.herokuapp.com/"
            target="_blank"
          >
            WeTube
          </WeTubeLink>
        </ExtItem>
        <ExtItem>
          <RemoteJobsLink
            href="https://remote-jobs--heroinspace.repl.co/"
            target="_blank"
          >
            remote jobs
          </RemoteJobsLink>
        </ExtItem>
      </List>
    </HeaderColumn>
  </Header>
));

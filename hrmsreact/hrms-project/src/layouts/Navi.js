import React,{useState} from "react";
import {  Icon, Menu } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import SignedOut from "../layouts/SignedOut";
import SignedIn from "../layouts/SignedIn";

export default function Navi() {
  const [isAuthenticated, setisAuthenticated] = useState(true)

  function handleSignOut(params) {
    setisAuthenticated(false);
  }
  function handleSignIn(params) {
    setisAuthenticated(true);
  }


  return (
    <div>
      <Menu inverted fixed="top" size="large">
        <Container>
          <Menu.Item name="building outline">
            <Icon name="building outline" size="large"/>
            HRMS
          </Menu.Item>
          <Menu.Item name="Home" />
          <Menu.Item name="Job Advert" />
          <Menu.Item name="Companies" />
          <Menu.Menu position="right">
            {/* <Dropdown item text="Language">
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            {isAuthenticated?<SignedIn signOut={handleSignOut}/>:<SignedOut signIn={handleSignIn}/>}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
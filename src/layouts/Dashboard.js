import React from "react";
import { Grid } from "semantic-ui-react";
import Section from "./Section";
import SideBar from "./SideBar";
import { Route } from "react-router";
import JobadAdd from "../pages/jobad/jobadAdd";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={12}>
              <Route exact path="/" component={Section} />
              <Route exact path="/postJob/add" component={JobadAdd} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import JobAdvertList from "../pages/jobad/jobadList";
import JobPositionList from "../pages/jobad/JobPositionList";
import EmployerList from "../pages/user/EmployerList";
import CandidateList from "../pages/user/CandidateList";

export default function Section() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <GridColumn size={14}>
            <CandidateList />
          </GridColumn>
        </Grid.Row>
        <Grid.Row>
          <GridColumn size={14}>
            <EmployerList />
          </GridColumn>
        </Grid.Row>
        <Grid.Row>
          <GridColumn size={14}>
            <JobAdvertList />
          </GridColumn>
        </Grid.Row>
        <Grid.Row>
          <GridColumn size={14}>
            <JobPositionList />
          </GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  );
}
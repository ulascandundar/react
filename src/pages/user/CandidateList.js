import React, { useState, useEffect } from "react";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import CandidateService from "../../services/candidateService";

export default function CandidateList() {
    const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidates()
      .then((result) => setCandidates(result.data.data));
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Candidate List</Header.Content>
      </Header>
      <Table color="blue" key="blue">
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>linkedInAccount</Table.HeaderCell>
            <Table.HeaderCell>githubAccount</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {candidates.map((candidate) => (
            <Table.Row key = {candidate.id}>
              <Table.Cell>{candidate.first_name}</Table.Cell>
              <Table.Cell>{candidate.last_name}</Table.Cell>
              <Table.Cell>{candidate.linkedInAccount}</Table.Cell>
              <Table.Cell>{candidate.githubAccount}</Table.Cell>
              <Table.Cell>{candidate.user.email}</Table.Cell>
              <Table.Cell>
                <Button>View</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
    );
}
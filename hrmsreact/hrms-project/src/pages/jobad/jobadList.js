import React, { useState, useEffect } from "react";
import { Table, Button, Header, Icon } from "semantic-ui-react";
import JobadService from "../../services/jobadService";

export default function JobAdvertList() {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobadService();
    jobAdvertService
    .getJobad()
    .then((result) => setAdverts(result.data.data));
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Job Advert List</Header.Content>
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>jobDescription</Table.HeaderCell>
            <Table.HeaderCell>minSalary</Table.HeaderCell>
            <Table.HeaderCell>maxSalary</Table.HeaderCell>
            <Table.HeaderCell>isActive</Table.HeaderCell>
            <Table.HeaderCell>jobTitle</Table.HeaderCell>
            <Table.HeaderCell>city</Table.HeaderCell>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {adverts.map((advert) => (
            <Table.Row key={advert.id}>
              <Table.Cell>{advert.jobDescription}</Table.Cell>
              <Table.Cell>{advert.minSalary.toString()}</Table.Cell>
              <Table.Cell>{advert.maxSalary.toString()}</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>{advert.jobTitle.title}</Table.Cell>
              <Table.Cell>{advert.city.cityName}</Table.Cell>
              <Table.Cell>{advert.employer.companyName}</Table.Cell>
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

import React, { Component } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PersonList extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=10')
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  render() {
    return (
      <div>
        <div style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
          User List
        </div>
        <Container className="mt-4">
          {this.state.persons.map((person) => (
            <Card key={person.login.uuid} className="mb-3 text-white" style={{ backgroundColor: '#3ba0c8', border: 'none' }}>
              <Row className="g-0 align-items-center">
                <Col md={2} className="text-center p-3">
                  <img src={person.picture.large} alt="Profile" className="img-fluid rounded-circle mb-2" />
                  <br />
                  <Button variant="primary" size="sm">Details</Button>
                </Col>
                <Col md={10} className="p-3">
                  <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                    {person.name.first} {person.name.last} - {person.login.uuid}
                  </div>
                  <Row>
                    <Col md={6}>
                      <p><strong>User Name:</strong> {person.login.username}</p>
                      <p><strong>Gender:</strong> {person.gender.toUpperCase()}</p>
                      <p><strong>Time Zone Description:</strong> {person.location.timezone.description}</p>
                      <p><strong>Address:</strong> {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} - {person.location.postcode}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Email:</strong> {person.email}</p>
                      <p><strong>Birth Date and Age:</strong> {person.dob.date} ({person.dob.age})</p>
                      <p><strong>Register Date:</strong> {person.registered.date}</p>
                      <p><strong>Phone:</strong> {person.phone}</p>
                      <p><strong>Cell:</strong> {person.cell}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        </Container>
      </div>
    );
  }
}

export default PersonList;

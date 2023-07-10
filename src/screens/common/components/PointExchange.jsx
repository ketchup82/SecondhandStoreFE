import { useState } from "react";
import { Container, Row, Col, ListGroup, Form, Card, Button } from 'react-bootstrap';

function PointSelection({ onPackageSelect }) {
  const [selectedValue, setSelectedValue] = useState("");

  function handlePointChange(event) {
    setSelectedValue(event.target.value);
  }

  function handlePackageSelect() {
    onPackageSelect(selectedValue);
  }

  return (
    <Col md={5}>
      <Card>
        <Card.Body>
        <h4>Choose Your Package</h4>
          <ListGroup>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio1"
                value="20"
                label="10,000 VND - Point × 20"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio2"
                value="40"
                label="20,000 VND - Point × 40"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio3"
                value="100"
                label="50,000 VND - Point × 100"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio4"
                value="200"
                label="100,000 VND - Point × 200"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio5"
                value="400"
                label="200,000 VND - Point × 400"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio6"
                value="1000"
                label="500,000 VND - Point × 1,000"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio7"
                value="2000"
                label="1,000,000 VND - Point × 2,000"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio8"
                value="4000"
                label="2,000,000 VND - Point × 4,000"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio9"
                value="10000"
                label="5,000,000 VND - Point × 10,000"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                name="pointRadio"
                id="pointRadio10"
                value="20000"
                label="10,000,000 VND - Point × 20,000"
                onChange={handlePointChange}
              />
            </ListGroup.Item>
          </ListGroup>
          <Button variant="primary" onClick={handlePackageSelect} disabled={!selectedValue}>Select Package</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function TransactionDetails({ selectedPackage }) {
  return (
    <Col md={7}>
      <Card>
        <Card.Body>
          <h4>Transaction Details</h4>
          <hr />
          <p>Selected Package:    Point x {selectedPackage}</p>
          <hr />
          <div className="d-flex flex-row align-items-center mb-4 pb-1">
            <img className="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
            <div className="flex-fill mx-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="formControlLgXc"
                  className="form-control form-control-lg"
                  defaultValue="**** **** **** 1234"
                  
                />
                <label className="form-label" htmlFor="formControlLgXc">Card Number</label>
              </div>
            </div>
          </div>
          <p className="fw-bold  pb-1">Or with :</p>
          <div className="d-flex flex-row align-items-center mb-4 pb-1">
            <img className="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" />
            <div className="flex-fill mx-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="formControlLgXc"
                  className="form-control form-control-lg"
                  defaultValue="**** **** **** 5678"
                  
                />
                <label className="form-label" htmlFor="formControlLgXc">Card Number</label>
              </div>
            </div>
          </div>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="formControlLgXc"
              className="form-control form-control-lg"
              defaultValue="John Doe"
              
            />
            <label className="form-label" htmlFor="formControlLgXc">Cardholder Name</label>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="form-outline">
                <input
                  type="text"
                  id="formControlLgXc"
                  className="form-control form-control-lg"
                  defaultValue="12"
                  
                />
                <label className="form-label" htmlFor="formControlLgXc">Expiration Month</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-outline">
                <input
                  type="text"
                  id="formControlLgXc"
                  className="form-control form-control-lg"
                  defaultValue="2025"
                 
                />
                <label className="form-label" htmlFor="formControlLgXc">Expiration Year</label>
              </div>
            </div>
          </div>
          <p className="text-muted">Please enter your card details to complete the transaction.</p>
          <Button variant="primary" >Pay Now</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function PointExchange() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  function handlePackageSelect(packageValue) {
    setSelectedPackage(packageValue);
  }

  return (
    <Container className="py-5">
      <Row>
        <PointSelection onPackageSelect={handlePackageSelect} />
        {selectedPackage && <TransactionDetails selectedPackage={selectedPackage} />}
      </Row>
    </Container>
  );
}

export default PointExchange;
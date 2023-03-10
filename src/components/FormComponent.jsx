import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
function FormComponent() {
  const nameRef = useRef();
  const ageRef = useRef();
  const qualificationRef = useRef();
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  //   Function that put image into state
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onPdfChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPdf(URL.createObjectURL(event.target.files[0]));
    }
  };
  const submitHandler = () => {
    if (nameRef.current.value === "") {
      setMessage("Name Field Can Not Be Empty !!");
      nameRef.current.focus();
    } else if (ageRef.current.value === "") {
      setMessage("Age Field Can Not Be Empty !!");
      ageRef.current.focus();
    } else if (isNaN(ageRef.current.value)) {
      setMessage("Type Age Is Numbers !!");
      ageRef.current.focus();
    } else if (qualificationRef.current.value === "") {
      setMessage("Select Qualification Field Can Not Be Empty !!");
      qualificationRef.current.focus();
    } else if (image === "") {
      setMessage("Image Field Can Not Be Empty !!");
    } else if (pdf === "") {
      setMessage("PDF Field Can Not Be Empty !!");
    } else {
      let obj = {
        name: nameRef.current.value,
        age: ageRef.current.value,
        qualification: qualificationRef.current.value,
        image: image,
        pdf: pdf,
      };
      console.log(obj);
    }
  };
  return (
    <div className="form">
      <h1>Student Registraction Form</h1>
      <br></br>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ width: "113px" }} id="basic-addon2">
          Name
        </InputGroup.Text>
        <Form.Control
          aria-label="Recipient's name"
          aria-describedby="basic-addon2"
          ref={nameRef}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ width: "113px" }} id="basic-addon2">
          Age
        </InputGroup.Text>
        <Form.Control
          aria-label="Recipient's name"
          aria-describedby="basic-addon2"
          ref={ageRef}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ width: "113px" }} id="basic-addon2">
          Select
        </InputGroup.Text>
        <Form.Select ref={qualificationRef} aria-label="Default select example">
          <option value="" selected disabled>
            --Highest Qualification--
          </option>
          <option value="10th">10th</option>
          <option value="12th">12th</option>
          <option value="Graduation">Graduation</option>
          <option value="Post Graduation">Post Graduation</option>
        </Form.Select>
      </InputGroup>
      <Container>
        <Row>
          <Col style={{ borderRight: "2px solid lightGray" }}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Photo Image(.png)</Form.Label>
              <Form.Control onChange={onImageChange} type="file" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Id Proof(.pdf)</Form.Label>
              <Form.Control onChange={onPdfChange} type="file" />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <br></br>
      <div className="d-grid gap-2">
        <Button onClick={submitHandler} variant="success" size="lg">
          SUBMIT
        </Button>
      </div>
      <br></br>
      {message !== "" ? (
        <Alert onClose={() => setMessage("")} variant="danger" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{message}</p>
        </Alert>
      ) : null}
    </div>
  );
}

export default FormComponent;

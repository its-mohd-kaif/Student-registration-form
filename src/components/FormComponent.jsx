import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
function FormComponent() {
  // Ref For Input Text Fields
  const nameRef = useRef();
  const ageRef = useRef();
  const qualificationRef = useRef();
  // State For Photo Image
  const [image, setImage] = useState({
    img: "",
    type: "",
    size: 0,
  });
  // State For PDF
  const [pdf, setPdf] = useState({
    pdf: "",
    type: "",
    size: 0,
    name: "",
  });
  // State For Alert Input Box
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  //   Function that store image file into state
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage({
        img: URL.createObjectURL(event.target.files[0]),
        type: event.target.files[0].type,
        size: event.target.files[0].size,
      });
    }
  };
  // Function that store pdf file into state
  const onPdfChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPdf({
        pdf: URL.createObjectURL(event.target.files[0]),
        type: event.target.files[0].type,
        size: event.target.files[0].size,
        name: event.target.files[0].name,
      });
    }
  };
  // Submit Handler Function
  const submitHandler = () => {
    // Check Validation
    if (nameRef.current.value === "") {
      setMessage("Name Field Can Not Be Empty !!");
      nameRef.current.focus();
    } else if (ageRef.current.value === "") {
      setMessage("Age Field Can Not Be Empty !!");
      ageRef.current.focus();
    } else if (isNaN(ageRef.current.value)) {
      setMessage("Type Age In Numbers !!");
      ageRef.current.focus();
    } else if (qualificationRef.current.value === "") {
      setMessage("Select Qualification Field Can Not Be Empty !!");
      qualificationRef.current.focus();
    } else if (image.img === "") {
      setMessage("Photo Field Can Not Be Empty !!");
    } else if (image.type.includes("/png") === false) {
      setMessage("Photo Can Only Be In PNG Type !!");
    } else if (
      parseInt(image.size / 1024) < 50 ||
      parseInt(image.size / 1024) > 200
    ) {
      setMessage("Photo Size Range Should Be Between [50-200]kb !!");
    } else if (pdf.pdf === "") {
      setMessage("ID Proof Field Can Not Be Empty !!");
    } else if (pdf.type.includes("/pdf") === false) {
      setMessage("ID Proof Can Only Be In PDF Type !!");
    } else if (
      parseInt(pdf.size / 1024) < 100 ||
      parseInt(pdf.size / 1024) > 500
    ) {
      setMessage("ID Proof Size Range Should Be Between [100-500]kb !!");
    } else {
      // Make A Object
      let obj = {
        name: nameRef.current.value,
        age: ageRef.current.value,
        qualification: qualificationRef.current.value,
        image: image,
        pdf: pdf,
      };
      setMessage("");
      let tempArr = [];
      if (JSON.parse(localStorage.getItem("data")) !== null) {
        tempArr = JSON.parse(localStorage.getItem("data"));
      }
      // Push Into Array
      tempArr.push(obj);
      // Set Into Local Storage
      localStorage.setItem("data", JSON.stringify(tempArr));
      navigate("/display");
    }
  };
  return (
    <div className="form">
      <h1>Student Registraction Form</h1>
      {/* Form Display */}
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

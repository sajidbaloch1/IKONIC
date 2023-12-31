import Header from "../auth-layouts/header";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerUser } from "../Common/auth-api/auth-api";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await registerUser(values);
        if (response) {
          alert("You Are Registerd Successfully Kindly Login!");
          navigate("/login");
        } else {
          console.error("sorry");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Col lg={5} className="m-auto">
          <Form onSubmit={formik.handleSubmit}>
            <Card>
              <Card.Header className="bg-primary">
                <Card.Title className="text-center text-light">
                  Register Form
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    {...formik.getFieldProps("name")}
                    isInvalid={
                      formik.touched.name && Boolean(formik.errors.name)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.name && formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    {...formik.getFieldProps("email")}
                    isInvalid={
                      formik.touched.email && Boolean(formik.errors.email)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.email && formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.password && formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
      </Container>
    </>
  );
};

export default Register;

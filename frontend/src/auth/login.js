import Header from "../auth-layouts/header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../Common/auth-context";
import { loginUser } from "../Common/auth-api/auth-api";
const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      const response = await loginUser(values);
      if (response.user) {
        login(response.user, response.access_token);
        alert("Login Successfully");
        navigate("/");
      } else {
        console.log(response.error);
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
                  Login Form
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your email"
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
                <p className="text-danger mt-2">
                  If you don't have an Account, kindly click the Register Button
                </p>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button variant="dark" href="register">
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
export default Login;

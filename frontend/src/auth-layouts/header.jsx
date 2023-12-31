import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
const Header = () => {
  return (
    <>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand href="#home" className="text-light">
            IKONIC
          </Navbar.Brand>
          <Button variant="primary">Admin</Button>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;

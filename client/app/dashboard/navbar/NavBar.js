"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/navigation";
import "./navbar.css";

function NavBar() {
  const router = useRouter();
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand onClick={() => router.push("/dashboard/home")}>
          {" "}
          <i className="bx bxs-user-rectangle bx-lg" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => router.push("/dashboard/home")}
              className="btn btn-outline-success"
            >
              Principal
            </Nav.Link>
            <Nav.Link
              onClick={() => router.push("/dashboard/editprofile")}
              className="btn btn-outline-success"
            >
              Editar perfil
            </Nav.Link>
            <NavDropdown
              title="Administrador"
              id="basic-nav-dropdown"
              className="btn btn-outline-success"
            >
              <NavDropdown.Item
                onClick={() => router.push("/dashboard/client")}
              >
                Clientes
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => router.push("/dashboard/sending")}
              >
                Envíos
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">
                No disponible
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                No disponible
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link
              onClick={() => router.push("/")}
              className="btn btn-outline-danger"
            >
              Salir
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

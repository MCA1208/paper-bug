"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/navigation";
import "./navbar.css";
import Logo from "./descarga.png";
import Image from "next/image";
import { Avatar } from "@mui/material";
import React, { useEffect } from "react";

function NavBar() {
  const [session, setSession] = React.useState("");

  const router = useRouter();

  const stringAvatar = () => {
    return {
      sx: {
        bgcolor: "#33BEFF",
      },
      children: `${session.split(" ")[0][0]}`,
    };
  };
  useEffect(() => {
    setSession(sessionStorage.getItem("name").toUpperCase().toString());
  }, []);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand onClick={() => router.push("/dashboard/home")}>
          <Image src={Logo} width={50} height={50} />{" "}
          {/* <i className="bx bxs-user-rectangle bx-lg" /> */}
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
              <NavDropdown.Item onClick={() => router.push("/dashboard/order")}>
                Pedidos
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => router.push("/dashboard/supplier")}
              >
                Mis datos proveedor
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => router.push("/dashboard/user")}>
                Usuarios
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => router.push("/dashboard/userclient")}
              >
                Usuarios Cliente
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={() => router.push("/")}
              className="btn btn-outline-danger"
            >
              Salir
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Avatar {...stringAvatar()} />
      </Container>
    </Navbar>
  );
}

export default NavBar;

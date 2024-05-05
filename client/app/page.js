"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { CircularProgress, Backdrop } from "@mui/material";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(false);
  const router = useRouter();

  const login = async () => {
    handleProcess(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    console.log(requestOptions);

    await fetch("http://localhost:8080/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          sessionStorage.setItem("id", data.result.data[0].id);
          sessionStorage.setItem("email", data.result.data[0].email);
          router.push("/dashboard/home");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Credenciales incorrectas" + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 3000,
          });
          handleProcess(false);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "error en la solicitud" + " " + data.result.data,
          icon: "error",
          confirmButtonText: "Cerrar",
          timer: 3000,
        });
        handleProcess(false);
      });
  };

  const handleProcess = (stateProgress) => setProgress(stateProgress);

  return (
    <body>
      <div className="wrapper">
        <div>
          <h2>SHIPPING TRACKING</h2>
          <h1>Ingresar</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Recordar
            </label>
            <a href="#">¿Has olvidado tu contraseña?</a>
          </div>
          <div className="input-box">
            <button
              type="submit"
              onClick={login}
              className="btn btn btn-primary"
            >
              Login
            </button>
          </div>

          <div className="register-link" style={{ height: 10 }}>
            <p>
              No tengo una cuenta?
              <a href="/dashboard/register"> Registrarse</a>
            </p>
          </div>
        </div>
      </div>
      {progress && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={progress}
        >
          {progress && <CircularProgress />}
        </Backdrop>
      )}
    </body>
  );
}

export default page;

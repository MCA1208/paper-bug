'use client'

import React from 'react';
import '../../globals.css';
import './register.css';
import { useRouter } from 'next/navigation'
import  { useState } from 'react';
import Swal from 'sweetalert2';


function registerPage() {
  const router = useRouter()

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  // const getUser = () => {

  //   fetch("http://localhost:8080/users/2").then(
  //       response => response.json() 
  //     ).then(
  //       data =>{
  //         console.log(`ver json  client::: ${JSON.stringify(data)}`);
  //         setMessage(data);

  //         console.log(`mesaje amacenado: ${JSON.stringify(message)}`);
  //       }
  //     )
  // };
  const createuser = () => {

    if (!name ||!email || !password) { 
      Swal.fire({
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        timer: 3000
      })
      return true;
    }  else if (!/\S+@\S+\.\S+/.test(email)) { 
      Swal.fire({
        title: 'Error!',
        text: 'Email es invalido',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        timer: 3000
      });
      return true;
    } else if (password != repeat){
      Swal.fire({
        title: 'Error!',
        text: 'No coicide la contraseñas',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        timer: 3000
      });
      return true;
    } else if (password.length < 6) { 
      Swal.fire({
        title: 'Error!',
        text: 'La contraseña debe tener mas de 6 caracteres',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        timer: 3000
      });
      return true;
    } 

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password })
    };

    console.log(requestOptions);

    fetch("http://localhost:8080/createusers", requestOptions)
    .then(
      response => response.json() 
    ).then(
      data =>{

        if(data.result.status == true){

          Swal.fire({            
            icon: "success",
            title: "Se creó el usuario con éxito!",
            showConfirmButton: false,
            timer: 1500
          });

        }
        else{
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo crear el usuario' +' '+ data.result.data,
            icon: 'error',
            confirmButtonText: 'Cerrar',
            timer: 3000
          })
        }
      }
    )
    
  }

  const testAlert = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    })
  }


  return (
    <body>
      <div className='wrapper'>
        <form>
          <h1>Registrarse</h1>
          
          <div className='input-box'>
              <input type='text' placeholder='Alias'
                  value={name}
                  onChange={  e => setName(e.target.value) }
                  required/>
              <i className='bx bxs-user'></i>
          </div>

          <div className='input-box'>
              <input type='text' placeholder='Email'
                  value={email}
                  onChange={  e => setEmail(e.target.value) }
                  required/>
              <i className='bx bxs-user'></i>
          </div>

          <div className='input-box'>
              <input type='password' placeholder='Contraseña'                  
                  value={password}
                  onChange={ e => setPassword(e.target.value)}
                  required/>
              <i className='bx bxs-lock-open'></i>
          </div>

          <div className='input-box'>
              <input type='password' placeholder='Repetir Contraseña' 
                  value={repeat}
                  onChange={ e => setRepeat(e.target.value)}
                  required/>              
              <i className='bx bxs-lock'></i>
          </div>

        </form>
          <div className='row'>
            <div className='col-6'>
              <button type='submit' className='btn-register btn btn-secondary' 
              onClick={() => router.push('/')}>
              <i  className='bx bx-arrow-back boxicon'></i>
                  Volver
              </button>
              
            </div>
            <div className='col-6'>
              <button type='submit' className='btn-register btn btn-primary boxicon'
                onClick={createuser}>
                <i className='bx bxs-user-plus boxicon'></i>
                  Crear                  
              </button>              
            </div>
          </div>
      </div>
    </body>
  )
}

export default registerPage
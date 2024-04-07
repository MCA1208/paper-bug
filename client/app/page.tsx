"use client"
import React, { useEffect, useState } from 'react';
import './globals.css';
import Swal from 'sweetalert2';
//import { redirect } from 'next/dist/server/api-utils';
//import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'



function page() {

  //onst [message, setMessage] = useState("Loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  // useEffect(()=>{
  //   fetch("http://localhost:8080/users").then(
  //     response => response.json() 
  //   ).then(
  //     data =>{
  //       console.log(`ver json  client::: ${JSON.stringify(data)}`);
  //       setMessage(data);
  //       //setPeople(data.people);
  //     }
  //   )
  // }, [])

  const login = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };

    console.log(requestOptions);

    fetch("http://localhost:8080/login", requestOptions)
    .then(
      response => response.json() 
    ).then(
      data =>{

        if(data.result.status == true){

          router.push("/dashboard/home");

        }
        else{
          Swal.fire({
            title: 'Error!',
            text: 'Credenciales incorrectas' +' '+ data.result.data,
            icon: 'error',
            confirmButtonText: 'Cerrar',
            timer: 3000
          })
        }
      }
    )
  }

  return (

      // {JSON.stringify(message)}
    <body>
      <div className='wrapper'>
        <div>
          <h1>Ingresar</h1>
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
              <i className='bx bxs-lock-alt'></i>
          </div>
          <div className='remember-forgot'>
              <label><input type='checkbox'/> Recordar  
              </label>
              <a href='#'>¿Has olvidado tu contraseña?</a>
          </div>
          <div className='input-box'>
            <button type='submit' onClick={login} className='btn btn btn-primary'>Login</button>
          </div>

          <div className='register-link'>
              <p>No tengo una cuenta?
                <a href='/dashboard/register'> Registrarse</a>
              </p>
          </div>
        </div>
      </div>
    </body>
  )
}

export default page
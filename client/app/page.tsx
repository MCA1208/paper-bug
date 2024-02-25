"use client"
import React, { useEffect, useState } from 'react';
import './globals.css'


function page() {

  const [message, setMessage] = useState("Loading");
  const [people, setPeople] =useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/users").then(
      response => response.json() 
    ).then(
      data =>{
        console.log(`ver json  client::: ${JSON.stringify(data)}`);
        setMessage(data);
        //setPeople(data.people);
      }
    )
  }, [])

  return (

      // {JSON.stringify(message)}
    <body>
      <div className='wrapper'>
        <form>
          <h1>Ingresar</h1>
          <div className='input-box'>
              <input type='text' placeholder='Usuario' 
              required/>
              <i className='bx bxs-user'></i>
          </div>

          <div className='input-box'>
              <input type='password' placeholder='Contraseña' 
              required/>
              <i className='bx bxs-lock-alt'></i>
          </div>

          <div className='remember-forgot'>
              <label><input type='checkbox'/> Recordar  
              </label>
              <a href='#'>¿Has olvidado tu contraseña?</a>
          </div>

          <button type='submit' className='btn btn btn-primary'>Login</button>

          <div className='register-link'>
              <p>No tengo una cuenta?
                <a href='/dashboard/register'> Registrarse</a>
              </p>
          </div>
        </form>
      </div>
    </body>
  )
}

export default page
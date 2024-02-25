'use client'

import React from 'react';
import '../../globals.css';
import './register.css';
import { useRouter } from 'next/navigation'
import { inherits } from 'util';



function registerPage() {
  const router = useRouter()
  return (
    <body>
      <div className='wrapper'>
        <form>
          <h1>Registrarse</h1>
          <div className='input-box'>
              <input type='text' placeholder='Usuario' 
              required/>
              <i className='bx bxs-user'></i>
          </div>

          <div className='input-box'>
              <input type='password' placeholder='Contraseña' 
              required/>
              <i className='bx bxs-lock-open'></i>
          </div>

          <div className='input-box'>
              <input type='password' placeholder='Repetir Contraseña' 
              required/>
              <i className='bx bxs-lock'></i>
          </div>

          <div className='row'>
            <div className='col-6'>
              <button type='submit' className='btn-register btn btn-secondary' onClick={() => router.push('/')}>
              <i  className='bx bx-arrow-back boxicon'></i>
                  Volver
              </button>
              
            </div>
            <div className='col-6'>
              <button type='submit' className='btn-register btn btn-primary boxicon'>
              <i className='bx bxs-user-plus boxicon'></i>
                  Crear                  
              </button>              
            </div>
          </div>
          
        </form>
      </div>
    </body>
  )
}

export default registerPage
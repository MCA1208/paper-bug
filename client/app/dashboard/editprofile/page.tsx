'use client';
import React from 'react'
import NavBar from '../navbar/NavBar';
import '../../globals.css';
import  { useState } from 'react';
import Swal from 'sweetalert2';

function page() {

  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  const modifyuser = () => {

    if (password == "" || repeat == ""){
      Swal.fire({
        title: 'Error!',
        text: 'Los campos no pueden estas vacios',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        //timer: 3000
      });
      return true;
    }else if(password != repeat){
      Swal.fire({
        title: 'Error!',
        text: 'No coicide la contraseñas',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        timer: 3000
      });
      //alert('No coicide la contraseñas')
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

    alert("modificar")
  }

  return (
    <div>
       <div><NavBar/></div>
            <div className='body'>
                <div className='wrapper'>
                    <form>
                      <h1>Edit Profile</h1>
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

                      <div className='input-box'>
                      <button type='submit' className='btn-register btn btn-primary boxicon'
                        onClick={modifyuser}>
                        <i className='bx bxs-user-plus boxicon'></i>
                          Modificar                  
                      </button>  
                      </div>          
                    </form>
            </div>  
        </div>
    </div>
  )
}

export default page
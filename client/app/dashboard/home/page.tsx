'use client';

import React from 'react';
import NavBar from '../navbar/NavBar'
import '../../globals.css';



function page() {
  return (
    <div>   
        <div><NavBar/></div>
            <div className='body'>
                <div className='wrapper'>
                    <form>
                    <h1>Seguimientos de envío</h1>
                      <div className='input-box'>
                          <input type='password' placeholder='Contraseña'                  
                              value=""
                              required/>
                          <i className='bx bxs-lock-open'></i>
                      </div>

                      <div className='input-box'>
                          <input type='password' placeholder='Repetir Contraseña' 
                              value=""
                              required/>              
                          <i className='bx bxs-lock'></i>
                      </div>  
                      <div className='input-box'>
                          <input type='password' placeholder='Repetir Contraseña' 
                              value=""
                              required/>              
                          <i className='bx bxs-lock'></i>
                      </div>  

 
                                   
                
                    </form>
            </div>  
        </div>
    </div>
  )
}

export default page
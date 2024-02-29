import React from 'react';
//import Icon from './icono.jpg';
import './navbar.css';
function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> <i className='bx bxs-user-rectangle bx-lg' ></i></a>
               
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item btn btn-outline-success">
                        <a className="nav-link" href="#">Editar Perfil</a>
                    </li>
                    <br/>
                    <li className="nav-item btn btn-outline-danger">
                        <a className="nav-link" href="/">Salir</a>
                    </li>
                    {/* <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li> */}
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default NavBar
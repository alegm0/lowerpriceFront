import React from 'react';
import { Link } from 'react-router-dom';
import { RedSocials, Routes } from '.';
import LogoNavbar from '../../assets/img/navbar/logo-session.svg';
import './NavbarVertical.css';
import axios from 'axios';
import { urlRequest } from '../../urlRequest';

function NavbarVertical () {
    const logout = () => {
        try {
          // El cierre de sesión fue exitoso, realiza cualquier otra acción necesaria
        } catch (error) {
          // Maneja el error en caso de que ocurra
          console.error('Error al cerrar sesión:', error);
        }
      };
    return (
        <div className="navbar-vertical">
            <div className="content-logo-navbar">
                <div className="navbar-logo">
                    <img src={LogoNavbar} alt="icono navbar" className="navbar-logo"/>
                </div>
            </div>
            <div className="content-link-navbar scroll-custom">
                {Routes.map(({icon, alt, title, url}, index) => (
                    <div className="link-navbar" key={index}>
                        <img src={icon} alt={alt} className="link-navbar-icon"/>
                        {title === 'cerrar sesion' ?
                            <Link to={logout} className="m-auto link-navbar-title">{title}</Link>
                        :
                            <Link to={url} className="m-auto link-navbar-title">{title}</Link> 
                        }
                        
                    </div>
                ))}
            </div>
            <div className="link-navbar link-navbar-red-social scroll-custom">
                {RedSocials.map(({icon, alt, link}, index) => (
                    <a className="link-red-social-navbar" href={link} key={index}><img src={icon} alt={alt} /></a>
                ))}
            </div>
        </div>
    );
}

export default NavbarVertical;

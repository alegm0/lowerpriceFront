import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RedSocials, Routes } from '.';
import LogoNavbar from '../../assets/img/navbar/logo-session.svg';
import { logOut } from '../../util/localStorage';
import './NavbarVertical.css';

function NavbarVertical () {
    //const history = useHistory();
    const [role] = useState(localStorage.getItem("role") || '');
    const [menu, setMenu] = useState(Routes);

    const logout = () => {
        logOut();
    };

    useEffect(() => {
        if (role === '2') {
            const newArray = [...Routes];
            newArray.splice(1,1);
            setMenu(newArray);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="navbar-vertical">
            <div className="content-logo-navbar">
                <div className="navbar-logo">
                    <img src={LogoNavbar} alt="icono navbar" className="navbar-logo"/>
                </div>
            </div>
            <div className="content-link-navbar scroll-custom">
                {menu?.map(({icon, alt, title, url}, index) => (
                    <div className="link-navbar" key={index}>
                       <a href={url} className="link-red-social-navbar"><img src={icon} alt={alt} to={url} className="link-navbar-icon"/></a> 
                        {title === 'Cerrar sesion' ?
                            <div className="m-auto link-navbar-title" onClick={() => {
                                logout();
                            }}>
                                <Link to={'/'} className="m-auto link-navbar-title">{title}</Link>
                            </div>
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

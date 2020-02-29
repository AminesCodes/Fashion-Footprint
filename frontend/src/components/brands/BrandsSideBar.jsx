import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar(props) {
    return (
        <>
            <img 
                className='d-block mx-auto m-2'
                src={require('../../assets/FFlogo.png')} 
                alt='App logo' 
                style={{
                    height: '200px', 
                    objectFit: 'scale-down',
                    marginLeft: '0'
                }}
            />
                    
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to={`/brands/${props.loggedUser.id}`} > Home </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to={`/brands/profile/${props.loggedUser.id}`} > Profile </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/about' > About </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/' onClick={props.handleLogout}> Logout </NavLink>
                </li>
            </ul>
        </>
    )
}
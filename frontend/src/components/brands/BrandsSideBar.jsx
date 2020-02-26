import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar(props) {
    return (
        <>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to={`/brands/${props.loggedUser.id}`} > Home </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to={`/brands/profile/${props.loggedUser.id}`} > Profile </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to={`/brands/${props.loggedUser.id}/add`} > Add Product </NavLink>
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
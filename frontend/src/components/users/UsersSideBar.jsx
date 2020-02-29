import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideBar(props) {
    return (
        <>
            <img 
                className='d-block mx-auto'
                src={require('../../assets/FFlogo.png')} 
                alt='App logo' 
                style={{
                    height: '150px', 
                    objectFit: 'scale-down',
                    marginLeft: '0'
                }}
            />

            <ul className='navbar-nav' >
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to={`/users/${props.loggedUser.id}`} > Home </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to={`/users/profile/${props.loggedUser.id}`} > Profile </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to={`/users/${props.loggedUser.id}/wishlist`} > Wishlist </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to={`/users/${props.loggedUser.id}/plans`} > Plans </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to={`/users/${props.loggedUser.id}/coupons`} > Coupons </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/materials' > Materials </NavLink>
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
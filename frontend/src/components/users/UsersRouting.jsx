import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersSideBar from './UsersSideBar';
import UsersHome from './UsersHome';
import UserProfile from './UserProfile';
import WishlistContainer from './WishlistContainer';
import About from '../About';

export default function UsersRouting(props) {
    return (
        <>
            <nav className='col-2 sideBar'>
                <UsersSideBar loggedUser={props.loggedUser} handleLogout={props.handleLogout}/>
            </nav>
            <div className='col-10 p-3 overflow-auto mainContent'>
                <Switch>
                    <Route path='/users/profile/:userId' render={routeProps => 
                        <UserProfile loggedUser={props.loggedUser} {...routeProps} />} >
                    </Route>
                    <Route path='/users/:userId/wishlist' render = {routeProps => 
                        <WishlistContainer loggedUser = {props.loggedUser} {...routeProps} />} >
                    </Route>
                    <Route path='/users/:userId' render={routeProps => 
                        <UsersHome loggedUser={props.loggedUser} {...routeProps} />} >
                    </Route>
                    <Route path='/about' render={routeProps => 
                        <About loggedUser={props.loggedUser} {...routeProps} />} >
                    </Route>
                </Switch>
            </div>
        </>
    )
}
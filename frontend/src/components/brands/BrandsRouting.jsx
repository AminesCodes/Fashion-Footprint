import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BrandsSideBar from './BrandsSideBar';
import About from '../About';
import BrandsHome from './BrandsHome';
import BrandProfile from './BrandProfile';

export default function BrandRouting(props) {
    return (
        <>
            {/* <nav className='col-2 sideBar'>
                <BrandsSideBar loggedUser={props.loggedUser} handleLogout={props.handleLogout}/>
            </nav>
            <div className='col-10 p-3 overflow-auto mainContent'> */}
                <Switch>
                    <Route path='/brands/Profile/:brandId' render={routeProps => 
                        <BrandProfile 
                            loggedUser={props.loggedUser} 
                            setUser={props.setUser} 
                            handleLogout={props.handleLogout} 
                            {...routeProps} />} >
                    </Route> 
                    <Route path='/brands/:brandId' render={routeProps => 
                        <BrandsHome loggedUser={props.loggedUser} {...routeProps} />} >
                    </Route> 
                    <Route path='/about' render={routeProps => 
                        <About loggedUser={props.loggedUser} {...routeProps} />} >
                    </Route>
                </Switch>
            {/* </div> */}
        </>
    )
}
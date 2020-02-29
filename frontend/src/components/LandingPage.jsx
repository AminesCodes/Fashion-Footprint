import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Feedback from './Feedback';
import LoginSignupForm from './LoginSignupForm';

export default function LandingPage (props) {
    const [userType, setUserType] = useState('');
    const [randomFact, setRandomFact] = useState('');
    const [networkErr, setNetworkErr] = useState(null);

    const getRandomFact = async () => {
        try {
          const { data } = await axios.get('/api/facts/random');
          setRandomFact(data.payload.fact);
    
        } catch (err) {
            setNetworkErr(err);
        }
    }
    
    useEffect(() => {
        getRandomFact();
    }, []);
    
    const hideFeedbackDiv = () => {
        setNetworkErr(null);
    }
    
    if (networkErr) {
        return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
    }

    return (
        <div className='container' style={{height: "100%", boxShadow: "6px 11px 17px 2px rgba(0,0,0,0.47)", backgroundColor: "#7BA098"}}>
            <img src={require('../assets/FFlogo.png')} alt="logo" height="240px" width="240px"/>
            <h1 style={{display: "inline", color: "#CAF7E2"}}>FASHION FOOTPRINT</h1>

            <div className='jumbotron text-center' style={{backgroundColor: "transparent", display: "inline"}}>
                <div className='container' style={{display: "inline"}}>
                    <h2 className='display-4' style={{color: "#CAF7E2"}}><strong>Did you know...</strong></h2>
                    <h4 >"{randomFact}"</h4>
                </div>
            </div>

            <div className='d-flex justify-content-around'>
                <button className='btn btn-dark' onClick={() => setUserType('users')} >I'm a user</button>
                <button className='btn btn-dark' onClick={() => setUserType('brands')}>I'm a brand</button>
            </div>

            { userType 
                ? <LoginSignupForm userType={userType} setUser={props.setUser}/>
                : null
            }
        </div>
    )
}
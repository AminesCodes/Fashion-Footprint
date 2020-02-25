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
        <div className='container'>
            <div className='jumbotron text-center'>
                <div className='container'>
                    <h1 className='display-4'>A Real Fact</h1>
                    <p className='lead'>{randomFact}</p>
                </div>
            </div>
            <div className='d-flex justify-content-around'>
                <button className='btn btn-primary' onClick={() => setUserType('users')} >I'm a user</button>
                <button className='btn btn-primary' onClick={() => setUserType('brands')}>I'm a brand</button>
            </div>

            { userType 
                ? <LoginSignupForm userType={userType} setUser={props.setUser}/>
                : null
            }
        </div>
    )
}
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Feedback from './Feedback';

export default function LoginSignupForm (props) {
    const [formType, setFormType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [brandName, setBrandName] = useState('');
    const [businessId, setBusinessId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [networkErr, setNetworkErr] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (email && password) {
            try {
                const url = `/api/auth/${props.userType}/${formType}`
                const requestBody = {
                    email,
                    password,
                    firstName,
                    lastName,
                    name: brandName,
                    businessID: businessId,
                }
                const { data } = await axios.post(url, requestBody)
                setEmail('');
                setPassword('');
                setBrandName('');
                setBusinessId('');
                setFirstName('');
                setLastName('');
                props.setUser(data.payload)
            } catch (err) {
                setNetworkErr(err)
            }
        }
    }

    const hideFeedbackDiv = () => {
        setNetworkErr(null)
    }

    if (networkErr) {
        return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
    }

    const staticFormPart = <span>
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='email' 
                    placeholder='Enter your email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='password' 
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
        </span>

    const loginSubForm = <span>
                <button className='btn btn-primary mb-2'>Login</button>
                <span className='mb-2 mx-2 mr-sm-2'>New to this app?
                    <span className='btn btn-link' onClick={() => setFormType('signup')}>Sign up</span>
                </span>
        </span>

    const signupSubForm = <span>
                <button className='btn btn-primary mb-2'>Sign-up</button>
                <span className='mb-2 mx-2 mr-sm-2'>Already a user?
                    <span className='btn btn-link' onClick={() => setFormType('login')}>Login</span>
                </span>
        </span>


    if (formType === 'login') {
        return(
            <form className='form' onSubmit={handleFormSubmit}>
                <h4 className='mb-2 mr-sm-2 text-center'>{`Logging as a ${props.userType.slice(0, -1)}`}</h4>
                {staticFormPart}
                {loginSubForm}
            </form>
        )
        
    } else if (props.userType === 'brands') {
        return (
            <form className='form' onSubmit={handleFormSubmit}>
                <h4 className='mb-2 mr-sm-2 text-center'>{`Signing up as a brand`}</h4>
                {staticFormPart}

                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='text' 
                    placeholder='Company / Brand name'
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                />

                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='number' 
                    placeholder='Business / Company ID'
                    value={businessId}
                    onChange={e => setBusinessId(e.target.value)}
                />

                {signupSubForm}                
            </form>
        )

    } else {
        return(
            <form className='form' onSubmit={handleFormSubmit}>
                <h4 className='mb-2 mr-sm-2 text-center'>{`Signing up as a user`}</h4>
                {staticFormPart}

                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='text' 
                    placeholder='Enter your first name'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='text' 
                    placeholder='Enter your last name'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            
                {signupSubForm}                
            </form>
        )  
    } 
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Feedback from '../Feedback';

export default function BrandProfile (props) {
console.log(props)
    const [email, setEmail] = useState(props.loggedUser.email);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [brandName, setBrandName] = useState(props.loggedUser.name);
    const [businessId, setBusinessId] = useState(props.loggedUser.business_id);
    const [updatingPassword, setUpdatingPassword] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [networkErr, setNetworkErr] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = `/api/auth/brands/${1}`
            const requestBody = {
                email,
                password,
                name: brandName,
                businessID: businessId,
            }

            const { data } = await axios.put(url, requestBody)
        } catch (err) {
            setNetworkErr(err)
        }
    }


    const hideFeedbackDiv = () => {
        setNetworkErr(null)
    }

    if (networkErr) {
        return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
    }

    const passwordUpdate = <>
            <input 
                className='form-control mb-2 mr-sm-2 text-center'
                type='password' 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input 
                className='form-control mb-2 mr-sm-2 text-center'
                type='password' 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />
            <input 
                className='form-control mb-2 mr-sm-2 text-center'
                type='password' 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
        </>
    return(
        <div className='container mt-5'>
            <form className='form' onSubmit={handleFormSubmit}>
                <input 
                    className='form-control mb-2 mr-sm-2 text-center'
                    type='text' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input 
                    className='form-control mb-2 mr-sm-2 text-center'
                    type='text' 
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                />

                <input 
                    className='form-control mb-2 mr-sm-2 text-center'
                    type='number' 
                    value={businessId}
                    onChange={e => setBusinessId(e.target.value)}
                />

                <div className='form-check'>
                    <label className='form-check-label' for='pwUpdate'>
                        Update password
                    </label>
                    <input className='form-check-input' type='checkbox' value='' id='pwUpdate' />
                </div>
            </form>
        </div>
    )
}
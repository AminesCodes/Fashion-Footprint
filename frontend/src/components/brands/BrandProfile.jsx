import React, { useState } from 'react';
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

        if (email && password && brandName && businessId 
            && (email !== props.loggedUser.email 
                || brandName !== props.loggedUser.name 
                || businessId !== props.loggedUser.business_id)) {
                    try {
                        const url = `/api/auth/brands/${props.loggedUser.id}`
                        const requestBody = {
                            email,
                            password,
                            name: brandName,
                            businessID: businessId,
                        }
            
                        const { data } = await axios.put(url, requestBody);
                        props.setUser(data.payload);
                        setFormSubmitted(true);
                        setPassword('');
                    } catch (err) {
                        setNetworkErr(err);
                    }
        }

        if (updatingPassword && newPassword && confirmPassword) {
            try {
                const url = `/api/auth/brands/${props.loggedUser.id}`
                const requestBody = {
                    newPassword,
                    confirmPassword,
                }
    
                await axios.patch(url, requestBody);
                setPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setFormSubmitted(true);
            } catch (err) {
                setNetworkErr(err);
            }
        }
    }

    const handleDeleteProfile = async () => {
        try {
            await axios.delete(`/api/auth/brands/${props.loggedUser.id}`);
            localStorage.clear();
            props.setUser(null);
            props.history.push({ pathname: `/` });
        } catch (err) {
            setNetworkErr(err);
        }
    }


    const hideFeedbackDiv = () => {
        setNetworkErr(null);
    }

    if (networkErr) {
        return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
    }

    const passwordUpdate = <>
            <input 
                className='form-control mb-2 mr-sm-2 text-center'
                type='password'
                placeholder='New password' 
                value={newPassword}
                onChange={e => {setFormSubmitted(false); setNewPassword(e.target.value)}}
            />
            <input 
                className='form-control mb-2 mr-sm-2 text-center'
                type='password'
                placeholder='Confirm password' 
                value={confirmPassword}
                onChange={e => {setFormSubmitted(false); setConfirmPassword(e.target.value)}}
            />
        </>

    const formSuccess = <div className='alert alert-success'>
            <strong>Success!</strong> Profile updated successfully.
        </div>

    return(
        <div className='container mt-5'>
            <form className='form' onSubmit={handleFormSubmit}>
                <label className='form-check-label mb-2 mr-sm-2' htmlFor='pw'>
                        Please enter your password to allow any update
                    </label>
                <input 
                    className='form-control mb-2 mr-sm-2 text-center'
                    id='pw'
                    type='password'
                    placeholder='Password' 
                    value={password}
                    onChange={e => {setFormSubmitted(false); setPassword(e.target.value)}}
                />
                
                <input 
                    className='form-control mb-2 mr-sm-2 text-center'
                    type='email' 
                    value={email}
                    onChange={e => {setFormSubmitted(false); setEmail(e.target.value)}}
                />

                <input 
                    className='form-control mb-2 mr-sm-2 text-center'
                    type='text' 
                    value={brandName}
                    onChange={e => {setFormSubmitted(false); setBrandName(e.target.value)}}
                />

                <input 
                    className='form-control mb-2 mr-sm-2 text-center'
                    type='number' 
                    value={businessId}
                    onChange={e => {setFormSubmitted(false); setBusinessId(e.target.value)}}
                />

                <div className='form-check mb-2 mr-sm-2'>
                    <input 
                        className='form-check-input' 
                        type='checkbox'
                        id='pwUpdate' 
                        onChange={e => {setFormSubmitted(false); setUpdatingPassword(e.target.checked)}}
                    />
                    <label className='form-check-label' htmlFor='pwUpdate'>
                        Update password
                    </label>
                </div>

                {updatingPassword
                    ? passwordUpdate
                    : null
                }
                <div className='text-right'>
                    <button className='btn btn-primary mb-2 mr-sm-2'>Submit</button>
                </div>
                {formSubmitted
                    ? formSuccess
                    : null
                }
            </form>
            <button className='btn btn-danger mb-2 mr-sm-2' onClick={handleDeleteProfile}>Delete Account</button>
        </div>
    )
}
import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Feedback from '../Feedback';

export default function AddProduct (props) {
    const brandID = props.loggedUser.id;

    const [networkErr, setNetworkErr] = useState(null);

    
    const hideFeedbackDiv = () => {
        setNetworkErr(null);
    }
    
    if (networkErr) {
        return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
    }

    return(
        <div className='container mt-5'>
            Add product
        </div>
    )
}
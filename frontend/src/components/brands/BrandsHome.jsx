import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Feedback from '../Feedback';

export default function BrandsHome (props) {
    const brandID = props.loggedUser.id;

    const [networkErr, setNetworkErr] = useState(null);

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`/api/products/${brandID}/all`);
            console.log(data.payload)
        } catch (err) {

        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const hideFeedbackDiv = () => {
        setNetworkErr(null);
    }
    
    if (networkErr) {
        return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
    }

    return(
        <div className='container mt-5'>
            brand feed
        </div>
    )
}
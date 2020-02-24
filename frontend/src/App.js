import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Feedback from './components/Feedback';
import LandingPage from './components/LandingPage'

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [networkErr, setNetworkErr] = useState(null);

  const checkIfUserLogged = async () => {
    try {
      const { data } = await axios.get('/api/auth/isUserLoggedIn')
      console.log(data.payload)
      setLoggedUser(data.payload)

    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log('User not logged in yet')
      } else {
        setNetworkErr(err)
      }
    }
  }

  useEffect(() => {
    checkIfUserLogged()
  }, []);

  const hideFeedbackDiv = () => {
    setNetworkErr(null)
  }

  if (networkErr) {
    return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
  }

  if (!loggedUser) {
    return <LandingPage setLoggedUser={setLoggedUser}/>
  }

  return (
    <div className='container-fluid'>
      products
    </div>
  );
}

export default App;

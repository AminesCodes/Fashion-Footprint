import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Feedback from './components/Feedback';
import LandingPage from './components/LandingPage';
import TopBar from './components/ToBar';
import UsersRouting from './components/users/UsersRouting';
import BrandsRouting from './components/brands/BrandsRouting';


function App(props) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [networkErr, setNetworkErr] = useState(null);

  const setUser = (user) => {
    setLoggedUser(user);
    if (user.business_id) {
      props.history.push({ pathname: `/brands/${user.id}` })
    } else {
      props.history.push({ pathname: `/users/${user.id}` })
    }
  }
  
  const checkIfUserLogged = async () => {
    try {
      const { data } = await axios.get('/api/auth/isUserLoggedIn')
      setUser(data.payload)

    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log('User not logged in yet');
      } else {
        setNetworkErr(err);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkIfUserLogged(); 
    }, 3000);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout')
      setLoggedUser(null)
    } catch (err) {
      setNetworkErr(err)
    }
  }

  const hideFeedbackDiv = () => {
    setNetworkErr(null);
  }

  if (networkErr) {
    return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
  }

  if (!loggedUser) {
    return <LandingPage setUser={setUser}/>
  }

  if (loggedUser.business_id) {
    return (
      <div className='container-fluid-md myApp'>
        <div className='row topBar'>
          <TopBar />
        </div>
        <div className='row mx-auto overflow-auto myPage'>
          <BrandsRouting loggedUser={loggedUser} handleLogout={handleLogout}/>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid-md myApp'>
      <div className='row topBar'>
        <TopBar />
      </div>
      <div className='row mx-auto overflow-auto myPage'>
        <UsersRouting loggedUser={loggedUser} handleLogout={handleLogout}/>
      </div>
    </div>
  );
}

export default withRouter(App);
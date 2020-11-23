import React, { useEffect, useState } from 'react';
import Auth from './auth/Auth';
import SiteBar from './home/Navbar';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }
  useEffect(()=> {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/> 
    : <Auth updateToken={updateToken}/>)
  }
  return (
    <div className="App">
      <SiteBar clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;

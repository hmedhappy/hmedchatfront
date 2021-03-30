import React, { useState } from 'react';

import '../Login.css';

export default function Login() {
  const [username, setusername] = useState();
  return (
    <div class='wrapper fadeInDown'>
      <div id='formContent'>
        <div class='fadeIn first'>
          <img
            src='https://www.b-cube.in/wp-content/uploads/2014/05/aditya-300x177.jpg'
            id='icon'
            alt='User Icon'
          />
          <h1>Hmed Chat</h1>
        </div>

        <input
          type='text'
          id='login'
          class='fadeIn second'
          name='login'
          style={{ flex: 1 }}
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder='Username'
        />
        <input
          onClick={() => {
            localStorage.setItem('chatUser', username);
            window.location.reload(true);
          }}
          type='submit'
          class='fadeIn fourth'
          value='Log In'
          value='enter'
        />

        {/* <div id="formFooter">
      <a class="underlineHover" href="#">Go to the Site</a>
    </div> */}
      </div>
    </div>
  );
}

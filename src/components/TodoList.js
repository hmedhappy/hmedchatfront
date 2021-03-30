import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Message from './Message';
import io from 'socket.io-client';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
/* import { imagemin } from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant'; */

const playAlert = require('alert-sound-notify');

const socket = io('https://hmedchat-back.herokuapp.com/');

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function TodoList() {
  const classes = useStyles();

  const [list, setlist] = useState([]);
  const [imgdata, setimgdata] = useState();
  const [newmessage, setnewmessage] = useState('');
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('chatUser')
  );
  useEffect(async () => {
    const { data } = await axios.get('https://hmedchat-back.herokuapp.com/messages');
    console.log(data);
    setlist(data);
    socket.on('new-message', ({ content, imgdata, username }) => {
      if (imgdata) {
        var arrayBufferView = new Uint8Array(imgdata);
        var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        setlist((old) => [...old, { content, imgdata: imageUrl, username }]);
      } else {
        setlist((old) => [...old, { content, username }]);
      }
      gobottom('reciver');
    });
  }, []);

  /*  const handlefile = () => {
    (async () => {
      const files = await imagemin(imgdata, {
        destination: 'buildd/images',
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      });

      console.log(files);
      //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
    })();
  }; */

  function sendMessage() {
    const newmsg = {
      content: newmessage,
      username: currentUser,
      imgdata: imgdata ? imgdata : null,
    };
    socket.emit('message', newmsg);

    axios.post('https://hmedchat-back.herokuapp.com/messages', newmsg);

    setnewmessage('');
    setimgdata();
  }

  const gobottom = (s) => {
    document.getElementById('chat-scroll').lastChild?.scrollIntoView(true);

    if (s == 'reciver') {
      playAlert('funk');
    }
  };

  return (
    <>
      <div className='App'>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='#'>
                Chat
              </a>
              <button
                className='btn btn-outline-danger'
                onClick={() => {
                  localStorage.removeItem('chatUser');
                  window.location.reload(true);
                }}>
                Logout
              </button>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav'>
                <li className='active'>
                  <a href='#'>Home</a>
                </li>
                <li>
                  <a href='#'>About</a>
                </li>
                <li>
                  <a href='#'>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='container'>
          <div id='chat-scroll' className='chat-box row'>
            {list?.map(({ username, content, imgdata }, index) => (
              <Message
                key={index}
                username={username}
                content={content}
                imgdata={imgdata}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>

        <div className='chat-footer'>
          <div className='container'>
            <form
              style={{ display: 'flex', justifyContent: 'center' }}
              onSubmit={async (e) => {
                e.preventDefault();
                sendMessage();
              }}>
              <input
                required
                value={newmessage}
                onChange={(e) => setnewmessage(e.target.value)}
                className='form-control'
                type='text'
                placeholder='Message'
              />
              <input
                accept='image/*'
                className={classes.input}
                id='icon-button-file'
                onChange={(e) => setimgdata(e.target.files[0])}
                type='file'
              />
              <label htmlFor='icon-button-file'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'>
                  <PhotoCamera style={{ fontSize: '25px', color: 'white' }} />
                </IconButton>
              </label>
              <input type='submit' style={{ display: 'none' }} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

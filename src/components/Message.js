import React from 'react';
import Chip from '@material-ui/core/Chip';
import transitions from '@material-ui/core/styles/transitions';

export default function Message({ username, content, imgdata, currentUser }) {
  return (
    <>
      <div
        style={{
          alignItems: username === currentUser ? 'flex-end' : 'flex-start',
          flexDirection: 'column',
          display: 'flex',
        }}>
        {imgdata ? (
          <img
            className='imgdata chat-item'
            style={
              username === currentUser ? { float: 'right' } : { float: 'left' }
            }
            src={imgdata}
          />
        ) : (
          <>
            <span
              style={
                username == currentUser
                  ? { textAlign: 'right' }
                  : { textAlign: 'left' }
              }>
              <b>{username === currentUser ? 'You' : username}</b>
            </span>
            <div
              className='col-md-12 chat-item'
              style={
                username == currentUser
                  ? {
                      borderRight: '5px solid blue',
                      textAlign: 'right',
                      backgroundColor: '#0000ff42',
                    }
                  : {
                      borderLeft: '5px solid red',
                      textAlign: 'left',
                    }
              }>
              {content}
            </div>
          </>
        )}
        <style jsx>
          {`
            .imgdata {
              height: auto;
              width: 50%;
              border-radius: 10px;
              zoom: 0.5;
            }
          `}
        </style>
      </div>
    </>
  );
}

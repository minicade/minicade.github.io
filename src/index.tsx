import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    
  </React.StrictMode>,
  document.getElementById('root')
);

if (window.localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
} else {
  document.body.classList.add('dark');
}
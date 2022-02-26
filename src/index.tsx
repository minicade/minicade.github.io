import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter, Route, Routes} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

if (window.localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
} else {
  document.body.classList.add('dark');
}
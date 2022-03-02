import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import {
  BrowserRouter
} from "react-router-dom";


const fetchedToken = localStorage.getItem('token');

axios.defaults.baseURL = 'http://10.1.130.10:88/dev.tms.api/';
// axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] =  `Bearer ${fetchedToken}`


function clearStorage() {
  let session = sessionStorage.getItem('register');
  if (session == null) {
      localStorage.removeItem('token');
      document.cookie = "username=; password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  sessionStorage.setItem('register', 1);
}
window.addEventListener('load', clearStorage);


ReactDOM.render(
  <BrowserRouter>  
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

;


import { useEffect, useState } from 'react';
import React from "react-dom";
import "./LoginForm.css"
import logo from "../images/logo.png"
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from 'react-router';
import { Alert, CircularProgress } from '@mui/material';



const LoginForm= () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  // const refresh = (tokenRefresh) => {
  //   console.log("refreshing token")
  //   return new Promise((resolve,reject)=>{
  //     axios.post('Account/refresh-token',{refreshToken:tokenRefresh}).then(data=>{
  //       if(data.succeeded===false){
  //         // set message
  //         resolve(false)
  //       } else {
  //         const accessToken = data.data.jwToken;
  //         localStorage.setItem('token', accessToken)
  //         resolve(accessToken);
  //       }
  //     })

  //   })
  // }

  // const requestLogin = async (accessToken, tokenRefresh) => {
  //   return new Promise((resolve,reject)=>{
  //     await axios.post("")
  //   })
  // }


  // const hasAccess = async (accessToken, tokenRefresh) => {
  //     if(!tokenRefresh) return null;

  //     if (accessToken === undefined){
  //       // generate new access token
  //       accessToken = await refresh(tokenRefresh)  
  //       return accessToken;
  //     }
  //     return accessToken;
  // }
         

         const submitForm = async (e) => {
          

            e.preventDefault();
            setIsLoading(true)
            document.cookie = "username=; password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

           
           const { data } =  await axios.post('Account/authenticate', { username, password }).catch(err => alert(err, 'Please Refresh and Try Again',window.location.reload()))
           console.log(data)

           if (data.succeeded) {
             navigate("/content")
             setIsLoading(false)
             localStorage.setItem('token', data.data.jwToken)
             localStorage.setItem('refresh', data.data.refreshToken)
            //  localStorage.setItem('refreshToken', data.data.refreshToken)
            }
            else {
              setError(data.message)
              setIsLoading(false)
            }
            
            
          }

          // let accessToken = localStorage.getItem('token');
          // let tokenRefresh = localStorage.getItem('refresh');

          // accessToken = hasAccess(accessToken,tokenRefresh);
          
          // if(!accessToken){
          //     // User needs to login again
          //     alert("Login again")
          // } 

          useEffect(() => {
            const controller = new AbortController();
            const signal = controller.signal;
            return () => {
              controller.abort();
            }
          }, [])

    return(
        <>

            <div className="container">
                <div className="left_container">
                   
                    <img src={logo} alt="logo"/>
                    
                    
                </div>
                <div className="right_container">
                   {error && <Alert severity="error">{error}</Alert> }
                    <h2>TMS</h2>
                    <h3>Sign In</h3>
                    
                    <div className="login-form">
                    
                    <form action= ""  autoComplete="off">
                    <label htmlFor ="email"><div className="label" > </div> </label>
                    <input type="email" className="inpt" placeholder="AD Account Login" value={username} onChange={(e)=>setUsername(e.target.value)}/>

                    <label htmlFor ="password"><div className="label2"> </div> </label>
                    <input  type="password" className="inpt" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

                    
                    <div className="btn">
                      <Button style={{
                        backgroundColor: "#0A387D"  
                      }}
                      variant = "contained" onClick={submitForm}>{!isLoading ? "Sign In": <CircularProgress style={{color:"white"}}/>}</Button>

                    </div>
                    </form>
                    </div>
   
                    
                </div>

            </div>       

        </>      
    ) 
}
export default LoginForm;
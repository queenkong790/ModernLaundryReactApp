import classes from './Login.module.css';

import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-router-dom';
import { getCustomers } from '../../api';
import BookNow from '../BookNow';
import Signup from './Signup';
import { Button } from 'bootstrap';
import Guest from './Guest';

import classes2 from './Signup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { setEmirateId } from  './../../components/Slices/emirateSlice'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../components/Slices/authSlice'
const emiratesMap = {
    "Ras Al Khaimah": 1,
    "Sharjah": 2,
    "Dubai": 3,
    "Umm Al Quwain": 4,
    "Ajman": 5
  };

const LoginPage = ({Login,setSerialNumber}) => {
    const [username,setusername]=useState(localStorage.getItem('email')?localStorage.getItem('email'):'');
    const[password,setpassword]=useState(localStorage.getItem('Password')?localStorage.getItem('Password'):'');
    const[redirecttosignup, setredirect]=useState(false)
    const[redirecttoguest, setredirectguest]=useState(false)
    const [invalid,setInvalid]=useState(false)
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch=useDispatch()
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
    
    
    const redirect=()=>{
        setredirect(true)
    }
    const redirectguest=()=>{
        setredirectguest(true)
    }
    const invalidcred=()=>{
        setInvalid(true)
    }
    if (redirecttosignup){
        return <Signup/>
    }
    if (redirecttoguest){
        return <Guest/>
    }
    
    
    
    
    const handleCheckboxChange=(e)=>{
        if(e.target.checked){
            localStorage.setItem('rememberMe','true')
        }else {
            localStorage.removeItem('rememberMe');
          }
    }    
    
    
    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Create the request payload
        const payload = {
          username: username,
          password: password,
        };
        
        if((username && password)!==''){
            try {
            
                //console.log(username,password)
                    const data =await getCustomers()
                    //const serial = await getcustomers
                    
                    data.some(obj => {
                       if (Object.values(obj).includes(username) && Object.values(obj).includes(password) ){
                        //setSerialNumber(obj.serialNo);
                        console.log('working')
                        localStorage.setItem("serialNo",obj.serialNo)
                        localStorage.setItem("email",obj.email)
                        localStorage.setItem('rate_code',obj.rate_code)
                        localStorage.setItem('address',obj.address)
                        
                        
                        
                        
                          const selectedEmirate = obj.rate_code;
                      
                          if (selectedEmirate in emiratesMap) {
                            const emirateNumber = emiratesMap[selectedEmirate];
                            console.log(emirateNumber)
                            dispatch(setEmirateId(emirateNumber));
                            localStorage.setItem('emirateNumber',emirateNumber)
                          }
                        
                          dispatch(login())
                        //Login();
                       }else{
                        setInvalid(true)
                       }
                       })
                      
                     
                    
                       
                       
                    //data.serial- >local strorage
        
        
                    
                    
            } catch (error) {
                    // Handle authentication failure or API request errors
                    console.error("Login failed:", error);
                    
            }
        }else{
            setInvalid(true)
        }
        

        
        
        };

    return (
        <div className={classes.main}>
        <div className={classes.formcontainer}>
           <div >
                <section className={classes.card}>
                    <div className={classes['header']}>
                        <h3 className={classes['login-text']}><strong>Login to your account</strong></h3>
                    </div>

                    <Form onSubmit={handleLogin} className={classes.body}>
                        {invalid && <p style={{color:'red'}}>Invalid Email or Password !</p>}
                        <div className={classes['input-control']}>
                            <input
                                type="email"
                                placeholder="Email ID"
                                className={classes['input-field']}
                                onChange={(e)=>setusername(e.target.value)}
                                defaultValue={localStorage.getItem('email')?localStorage.getItem('email'):''}
                            />
                        </div>
                        
                        <div className={classes['input-control']}>
                           <div className={classes['password-field']}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className={classes['input-field']
                            }
                            onChange={(e)=>setpassword(e.target.value)}
                            defaultValue={localStorage.getItem('Password')?localStorage.getItem('Password'):''}
                            />
                             <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                                className={classes['password-icon']}
                            />
                            </div>
                        </div>
                        
                        <div className={classes['span-text']}>
                            <label>
                                <input
                                    type="checkbox"
                                    // checked={isChecked}
                                     onChange={handleCheckboxChange}
                                />
                                <span className=' ' style={{fontSize:'1rem',color:'grey'}}>Remember Me</span>
                            </label> 
                            <a href='/ForgotPassword' style={{fontSize:'1rem',color:'grey',textDecoration:'none'}}>Forgot Password?</a>
                        </div>
                        <br></br>
                        <div className={classes.buttons}>
                            <div className={classes.button2}>
                                <button type='submit' name='submit' className={classes2.buttons} onClick={handleLogin} >Login</button>
                            </div>
                            <div className={classes.button2}>
                                <button type="button" className={classes2.buttons} onClick={redirect}>SignUp</button>
                            </div>
                        </div>
                        <br></br>
                        <div className={classes.guest}>
                        <button type="button" className={classes.button3} onClick={redirectguest}>Continue as a guest </button>
                        </div>
                        
                    </Form>
                    
                </section>
            </div>
           
        </div>
        
        </div>
    );
}

export default LoginPage;
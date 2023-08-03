import { useState } from 'react';
import bg from '../../assets/bg.png'
import 'bootstrap/dist/css/bootstrap.css';
import classes from './Signup.module.css'
import {postSignUp} from '../../api'
import { v4 as uuidv4 } from 'uuid';
import LoginPage from './Login';
import {Navigate, useNavigate } from 'react-router-dom';
import BookNow from '../BookNow';
import { useEffect } from 'react';


const initials=
    {
        "area" : "",
        "address": "",
        "last_name": "",
        "rate_code": "",
        "street_name": "",
        "contact_number": "",
        "serialNo": "",
        "alter_Contact_Number": "",
        "id": "",
        "first_name": "",
        "email": "",
        "apartment": "",
        "Password": ""
        }

const Signup = () => {
    const [input,setInput]=useState(initials)
    const[redirecttoLogin, setredirect]=useState(false)
    const navigate=useNavigate()
    const [fieldFilled, setFieldFilled] = useState({
        "area" : true,
        "address": true,
        "last_name": true,
        "rate_code": true,
        "street_name": true,
        "contact_number": true,
        "serialNo": false,
        "alter_Contact_Number": true,
        "id": false,
        "first_name": true,
        "email": true,
        "apartment": true,
        "Password": true
      });
      useEffect(() => {
        
        
      }, []);
    
     
    
    
    
    const submithandler = async (e)=>{
        e.preventDefault()
        
        console.log(input)
        const isAnyFieldEmpty = Object.values(fieldFilled).some((value) =>!value);
        console.log(isAnyFieldEmpty)
         
        try{
            const res=await postSignUp(input)
            //console.log(res)
            
            
            
        }catch(error){
            console.error(error);
            console.log('Response:', error.response);
        }
        
        setredirect(true)
        
    }
    if (redirecttoLogin) {
        return <BookNow/>
      }
    function inputChangeHandler(input,value){
        setInput((prevInput) => {
            return {
              ...prevInput,
              [input]: value,
            };
          });
          setFieldFilled((prevFilled) => ({
            ...prevFilled,
            [input]: value.trim() !== '', 
          }));
    }

    return (
        <div className={classes.container}>
            <div className=''>
                <section className={classes.section}>
                    <div className={classes.head} style={{margin:'0px',padding:'20px'}}>
                        <h3 className=''><strong>Signup to Earn Points with our Loyalty Program</strong></h3>
                    </div>

                    <form onSubmit={submithandler}>
                        <div className='row no-gutters'  style={{margin:'10px',padding:'10px'}}>
                            <div className='form-group col-md-6' >
                                <label htmlFor="firstname">First Name*</label>
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className='form-control'
                                    id='firstname'
                                    onChange={(event) =>
                                        inputChangeHandler('first_name', event.target.value)}
                                />
                            </div>
                            <div className='form-group no-gutters col-md-6'>
                                <label htmlFor="lastname">Last Name</label>
                                <br></br>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className='form-control'
                                    id='lastname'
                                    onChange={(event) =>
                                        inputChangeHandler('last_name', event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row 'style={{margin:'20px',padding:'10px'}}>
                        <div className='col md-6 form-group' >
                            <label htmlFor="Emirate">Emirate :</label>
                            <select id="Emirate" className='form-control' onChange={(event) =>
                                    inputChangeHandler('rate_code', event.target.value)}>
                                <option value="">Choose your Emirate</option>
                                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                <option value="Sharjah">Sharjah</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Umm Al Quwain">Umm Al Quwain</option>
                                <option value="Ajman">Ajman</option>
                                onChange
                            </select>
                        </div>
                        
                            <div className='col-md-6 form-group ' >
                            
                            <label htmlFor="Area">Area   &nbsp; &nbsp;:  </label>
                            <input id="Area" className='form-control'
                                onChange={(event) =>
                                    inputChangeHandler('area', event.target.value)}
                            />
                                
                                </div>
                                </div>

                        <div className='row ' style={{margin:'20px',padding:'10px'}}>
                            <div className='col-12 form-group'>
                            <label htmlFor="address">Closest matching address:</label>
                            <br></br>
                            <textarea
                                rows={1}
                                cols={50}
                                placeholder=""
                                className='form-control'
                                id='address'
                                onChange={(event) =>
                                    inputChangeHandler('address', event.target.value)}
                            />
                            </div>
                        </div>
                        
                        <div className='row' style={{margin:'20px',padding:'10px'}}>
                        <div className='form-group col-md-6'>
                            <label htmlFor="street">Street Name</label>
                            <br></br>
                            <input
                                type="text"
                                placeholder="Enter your Street Name"
                                className='form-control'
                                id='street'
                                
                                onChange={(event) =>
                                    inputChangeHandler('street_name', event.target.value)}
                            />
                        </div>
                        <div className='form-group col-md-6'>
                            <label htmlFor="apartment">Apartment/Building</label>
                            <br></br>
                            <input
                                type="text"
                                placeholder="Enter your Apartment/Building name"
                                className='form-control'
                                id='apartment'
                                onChange={(event) =>
                                    inputChangeHandler('apartment', event.target.value)}
                            />
                        </div>
                        </div>
                        <div className='row' style={{margin:'20px',padding:'10px'}}>
                            <div className='form-group col-md-6'>
                                <label htmlFor="phone">Contact Number</label>
                                <br></br>
                                
                                <input
                                    type="number"
                                    placeholder="Enter your Contact "
                                    className='form-control'
                                    id='phone'
                                    onChange={(event) =>
                                        inputChangeHandler('contact_number', event.target.value)}
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor="email">Email</label>
                                <br></br>
                                <input
                                    type="email"
                                    placeholder="Enter your Email ID"
                                    className='form-control'
                                    id='email'
                                    onChange={(event) =>
                                        inputChangeHandler('email', event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row' style={{margin:'20px',padding:'10px'}}>
                            <div className='form-group col-md-6'>
                            <label htmlFor="password">Choose a Password</label>
                            <br></br>
                            <input
                                type='Password'
                                placeholder="Choose a password"
                                className='form-control'
                                id='password'
                                onChange={(event) =>
                                    inputChangeHandler('Password', event.target.value)}
                            />
                            </div>
                        </div>
                        <div className='text-center'>           
                        <button className={classes.buttons} type='submit' style={{width:'300px'}} >Save Details</button>
                        </div> 
                    </form>
                </section>
            </div>
            
        </div>
    );

}
export default Signup;
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { postSignUp } from '../../api';
import BookNow from '../BookNow';
import classes from './Login.module.css'
import classes1 from './Signup.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEmirateId } from  './../../components/Slices/emirateSlice'

const initials = {
    "email": "",
    "rate_code": ""
}

function Guest() {
    const dispatch = useDispatch();
    const [input, setInput] = useState(initials)
    const [redirect, setRedirect] = useState(false);
    const [emirateNumber,setEmirateNumber]=useState('')
// Define the emirateNumber state variable
    const navigate = useNavigate();

    const inputHandler = (input, value) => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                [input]: value,
            };
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
          const res = await postSignUp(input);
          console.log(res);
          
        } catch (error) {
          console.error(error);
        }
    
        const emiratesMap = {
          "Ras Al Khaimah": 1,
          "Sharjah": 2,
          "Dubai": 3,
          "Umm Al Quwain": 4,
          "Ajman": 5
        };
    
        const selectedEmirate = input.rate_code;
    
        if (selectedEmirate in emiratesMap) {
          const emirateNumber = emiratesMap[selectedEmirate];
          dispatch(setEmirateId(emirateNumber)); // Dispatch the action to update emirateId in Redux
          setEmirateNumber(emirateNumber)
          setRedirect(true);
          //navigate('/cart', { state: { emirateNumber } });
        } else {
          setRedirect(false);
          //navigate('/cart');
        }
      }

    if (redirect) {
        return <BookNow GuestLogin={true} />;

    }

    return (
        <>
            <div className={classes.formcontainer}>
                <div >
                    <section className={classes.card}>
                        <div className={classes['header']}>
                            <h3 className={classes['login-text']}><strong>Booking as Guest</strong></h3>
                        </div>

                        <form onSubmit={submitHandler} className={classes.body}>

                            <div className={classes['input-control']}>
                                <label>Email*</label>
                                <input
                                    type="email"
                                    placeholder="Email ID"
                                    className={classes['input-field']}
                                    onChange={(e) => inputHandler("email", e.target.value)}
                                />
                            </div>

                            <div className={classes['input-control']}>
                                <label htmlFor="Emirate">Emirate</label>
                                <br></br>
                                <select id="Emirate" className={classes['input-field']} onChange={(e) => inputHandler("rate_code", e.target.value)} >
                                    <option value="">Choose your Emirate</option>
                                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                                    <option value="Ajman">Ajman</option>
                                </select>
                            </div>


                            <br></br>

                            <div className='text-center'>
                                <button className={classes1.buttons} >Continue</button>
                            </div>

                        </form>

                    </section>
                </div>

            </div>

        </>
    );
}

export default Guest;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { register } from '../actions/userAction';


export default function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } =userRegister
    const dispatch = useDispatch();
    const redirect = props.location.search? props.location.search.split('=')[1]:'/signin'

	useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
		return () => {
			//
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo]);
	const submitHandler = (e) =>{
      e.preventDefault()
      password===repassword?
      dispatch(register({name, email,password})):
      document.getElementById('red-message').innerText=
      "Your passwords don't match"
    }
	return (
	
			<form  className='form' onSubmit={submitHandler}>
                <ul className='form-container'>
                    <li>
                        <h3>Create new account</h3>
                    </li>
                    <li id='red-message'>
                        {loading && <div>Loading...</div>}
                        {error && <div className='red-message' >{error}</div>}
                    </li>
                    <li>
                       
                        <input type="text" id='name' name='name' onChange={(e) => setName(e.target.value)} placeholder='Your Name'/>
                    </li>
                    <li>
                      
                        <input type="email" id='email' name='email' onChange={(e) => setEmail(e.target.value) } placeholder='Your Email'/>
                    </li>
                    <li>
                       
                        <input type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)} placeholder='Your Password'/>
                    </li>
                    <li>
                        
                        <input type="password" id='repassword' name='repassword' onChange={(e) => setRepassword(e.target.value)} placeholder='Retype Your Password'/>
                    </li>
                    <li>
                        <button type='submit' className='button-secondary' onSubmit={submitHandler}>
                           Register
                        </button>
                    </li>
                    <li className="new-user">
                        already have an account?
                        <Link to={redirect ==='/'?'signin':'signin?redirect='+redirect} className='blue-link'>Sign-in</Link>
                    </li>
                   
                </ul>
            </form>
	
	);
}

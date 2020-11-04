import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { signin } from '../actions/userAction';


export default function SigninScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const { loading, userInfo, error } = userSignin
    const dispatch = useDispatch();
    const redirect = props.location.search? props.location.search.split('=')[1]:'/'
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
      dispatch(signin({email,password}))
    }
	return (
	
			<form  className='form' onSubmit={submitHandler}>
                <ul className='form-content'>
                    <li>
                        <h3>Sign-in</h3>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div className='red-message'>User email or password not found.</div>}
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' onChange={(e) => setEmail(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)}/>
                    </li>
                    <li>
                        <button type='submit' className='button-secondary'>
                           Sign in
                        </button>
                    </li>
                    <li className="new-user">
                        New to Tunida?
                    </li>
                    <li>
                        <Link to={redirect ==='/'?'register':'register?redirect='+redirect}className='secondary'>Create your Tunida account</Link>
                    </li>
                </ul>
            </form>
	
	);
}

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './signIn.scss'
import Logo from '../assets/Webgen'

const SignIn = () => {
    const initialState = {
        email: "",
        password: ""
    }

    const [state, setState] = useState(initialState)
    const { push } = useHistory(null)
    console.log(state)
    const setEmail = e => setState({ ...state, email: e.target.value })
    const setPassword = e => setState({ ...state, password: e.target.value })

    useEffect(() => {
        // checkIfSession()
    })

    const loginRequest = () => {
        axios.post("http://localhost:3001/login", state).then(res => {
            console.log(res)
            if (res.data) {
                localStorage.setItem("AccessToken", res?.data?.AccessToken)
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("image", res.data.imageLink)
                console.log(res)
                push("/dashboard")
            }
        }).catch(err => alert(err))
    }

    return (
        <div className="floater">
            <div className="signInInputHolder">
                <div className="signInLogoHolder">
                    <Logo />
                </div>
                <div className="signInContent">
                    <form className='signIn_form' onSubmit={e => e.preventDefault()}>
                        <label
                            className='label_custom'
                            for='email'
                        >Email</label>
                        <input
                            required
                            className='input_custom'
                            type='email'
                            id='email'
                            onChange={setEmail}
                        ></input>
                        <label className='label_custom'
                            for='password'
                        >Password</label>
                        <input
                            required
                            className='input_custom'
                            type='password'
                            id='password'
                            onChange={setPassword}
                        ></input>
                        <button className='form_button' onClick={() => loginRequest()}>login</button>
                    </form>
                    <div className="signInNewReset">
                        <a onClick={() => push("/registration")}>{"New Here?"}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a>{" Reset Password"}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn

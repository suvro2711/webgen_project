import React, { useState } from 'react'
import axios from 'axios'
import Logo from '../assets/Webgen'
import EmptyUser from '../assets/Profile'
import EditLogo from '../assets/Edit'
import { useHistory } from 'react-router-dom'
import './registration.scss'

const Registration = () => {

    const initialState = {
        name: "",
        email: "",
        imageFile: null,
        imageLink: "",
        password: "",
        confirm_password: ""
    }
    const { push } = useHistory(null)

    const [state, setState] = useState(initialState)
    //Dividing set state into 6 parts for passing to inputFields

    const setRegistrationState = (event) => {
        console.log(event.target.type, event.target.id)
        if (event.target.type === 'file' && event.target.files[0]) {
            setState({ ...state, image: event.target.files[0], imageLink: URL.createObjectURL(event.target.files[0]) })
            return
        }
        setState({ ...state, [event.target.id]: event.target.value })
    }

    console.log(state.imageFile)


    const validation = () => {
        if (!(state.password === state.confirm_password)) {
            return [false, "Paswords are not matching"]
        }
        return [true, ""]
    }

    const submit = () => {
        const [valid, message] = validation()
        if (!valid) {
            alert(message)
            return
        }
        const { name, email, password, imageFile } = state
        const data = new FormData()
        data.append("name", name)
        data.append("email", email)
        data.append("password", password)
        data.append("image", imageFile)
        axios.post("http://localhost:3001/register", data,).then(res => {
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('AccessToken', res.data.AccessToken)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('image', res.data.image)
            console.log(res)
            push('/dashboard')
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <div className="floater">
            <div className="regImage">
                <div>
                    {state.imageLink ? <img src={state.imageLink}></img> : <EmptyUser></EmptyUser>}
                    <div>
                        <EditLogo fill="#FFFFFF"></EditLogo>
                        <input type="file"
                            onChange={e => {
                                console.log(e.target.files[0])
                                setState({ ...state, imageFile: e.target.files[0], imageLink: URL.createObjectURL(e.target.files[0]) })
                            }}
                        ></input>
                    </div>
                    {/* <img src={EmptyUser}></img> */}
                </div>
            </div>
            <div className="regInputHolder">
                <div className="regLogoHolder">
                    <Logo />
                </div>
                <div className="regContent">
                    <form className='registration_form' onChange={setRegistrationState} onSubmit={e => e.preventDefault()}>
                        <label
                            className='label_custom'
                            for='email'
                        >Email</label>
                        <input
                            required
                            className='input_custom'
                            type='email'
                            id='email'
                        ></input>
                        <label className='label_custom'
                            for='password'
                        >Password</label>
                        <input
                            required
                            className='input_custom'
                            type='password'
                            id='password'
                        ></input>
                        <label className='label_custom'
                            for='confirm_password'
                        >Confirm Password</label>
                        <input
                            required
                            className='input_custom'
                            type='password'
                            id='confirm_password'
                        ></input>
                        <button className='form_button reg_button' onClick={() => submit()}>Register</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Registration




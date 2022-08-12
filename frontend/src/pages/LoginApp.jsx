import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import C from '../constants/loginApp';
import { ERRORS } from '../constants/global';
import { encrypt } from '../utils/encryption';
import validate_form from '../utils/validate_form';
import fetchRequest from '../utils/request';

const LoginApp = ({ setUser }) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [logInOrSignUp, setLogInOrSignUp] = useState("signup")
    const [open, setOpen] = useState(false);
    // TODO remove default values
    // const [input, setInput] = useState({})
    const [input, setInput] = useState({
        username: "username",
        email: "test@test.com",
        password: "password",
        confirmation: "password"
    });
    const [isValid, setIsValid] = useState(true)

    const handleInputChange = e => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    const handleClick = () => {
        delete input["confirmation"]
        setOpen(!open)
        setLogInOrSignUp(logInOrSignUp === "login" ? "signup" : "login")
    }

    const authenticateUser = (queryType, data) => {
        console.log()
        let method = ""
        let endpoint = ""
        if (queryType === "login") {
            method = 'POST'
            endpoint = "/login"
        } else {
            method = 'POST'
            endpoint = "/users"
        }
        fetchRequest(method, endpoint, data)
        .then(res => {data
            if (res.status >= 200 && res.status <= 299) {
                return res.json()
            } else {
                let msg =
                    res.status === 422 ? ERRORS.emailRegistered :
                    res.status === 404 ? ERRORS.invalidLogin : null

                msg && setErrorMessages({"email": msg})
                setIsValid(false)
                throw new Error(msg ?? res.statusText)
            }
        })
        .then(data => {
            delete data.user_enc_password
            console.log("data")
            console.log(data)
            localStorage.setItem("user", data)
            setUser(data)
        })
        .catch(err => console.log(err))
    }


    const handleSubmit = e => {
        e.preventDefault()
        if (validate_form(input, logInOrSignUp, setErrorMessages)){
            setIsValid(true)
            const data = {
                user_name: input.username,
                user_enc_password: encrypt(input.password)
            }
            if (logInOrSignUp ==="signup") {
                data.user_email = input.email
            }
            authenticateUser(logInOrSignUp, data)
        } else {
            setIsValid(false)
        }
    }

    // TODO remove value
    const renderFormInput = (name, type, value) => {
        return (
            <Form.Group key={name} className="mb-3" controlId={`form-${name}`}>
                <Form.Label>[{name}]</Form.Label>
                <Form.Control type={type} required
                    onChange={handleInputChange}
                    autoComplete={name}
                    name={name}
                    defaultValue={value}
                    placeholder={`Enter ${name}`}
                />
                {!isValid && errorMessages[name] &&
                    <Alert variant='danger' className="error">
                        {errorMessages[name]}
                    </Alert>}
            </Form.Group>
        )
    }

    const logFormComponent = (
        <Form onSubmit={handleSubmit}>
            <div id="form-container">
                {/* TODO remove value */}
                {C.inputFields
                    .filter(item => item.scope.includes(logInOrSignUp))
                    .map(({name, type, value}) => renderFormInput(name, type, value))
                }
            </div>
            <Button id="log-submit" type="submit" onSubmit={handleSubmit} className='spotify-green' variant="primary" >
                { C.connectionOptions[logInOrSignUp].text }
            </Button>
        </Form>
    )

    return (
        <div className='reset-container login'>
            <div className="header-login-div">
                <h1 className="display-1 heading-login rainbow-lr">&# Listen Yourself</h1>
            </div>
            <div id="app-login" className='center'>
                <h1>{C.connectionOptions[logInOrSignUp].text}</h1>
                {logFormComponent}
                <Button
                    id="switch"
                    aria-controls="confirmation"
                    aria-expanded={open} variant="outline-primary"
                    onClick={handleClick}>{ C.connectionOptions[logInOrSignUp].switch }
                </Button>
            </div>
        </div>
    )
}

export default LoginApp
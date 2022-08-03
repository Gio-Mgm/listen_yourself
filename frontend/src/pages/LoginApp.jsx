import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import C from '../constants/loginApp';

const LoginApp = ({ setIsLogged }) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [logInOrSignUp, setLogInOrSignUp] = useState("login")
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState({});
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

    const validate = () => {
        let errors = {}
        let validityStatus = true
        if (input["username"].length <= 6){
            validityStatus = false
            errors["username"] = "The name should contain more than 6 characters"
        }
        // if (input["email"].indexOf("@") === -1 ){
        //     validityStatus = false
        //     errors["email"] = "The email should contain @"
        // }
        if (input["password"].length <= 6){
            validityStatus = false
            errors["password"] = "The password should contain more than 6 characters"
        }

        if (logInOrSignUp === "signup" && input["password"] !== input["confirmation"]){
            validityStatus = false
            errors["confirmation"] = "Confirmation doesn't match password"
        }

        setErrorMessages(errors)
        console.log(validityStatus)
        return validityStatus
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            setIsValid(true)
            console.log("ok")
        } else {
            setIsValid(false)
        }
        // setIsLogged(true)
        // TODO authentification handler
        // // Find user login info
        // const userData = database.find((user) => user.username === uname.value);

        // // Compare user info
        // if (userData) {
        //     if (userData.password !== pass.value) {
        //     // Invalid password
        //     setErrorMessages({ name: "password", message: .pass });
        //     } else {
        //     setIsSubmitted(true);
        //     }
        // } else {
        //     // Username not found
        //     setErrorMessages({ name: "username", message: .uname });
        // }
    }

    const renderErrorMessage = name => {
        name === errorMessages[name] && (
            <Alert variant='danger' className="error">{errorMessages.name}</Alert>
        );
    }

    const renderFormInput = (name, type) => {
        return (
            <Form.Group key={name} className="mb-3" controlId={`form-${name}`}>
                <Form.Label>[{name}]</Form.Label>
                <Form.Control type={type} required
                    onChange={handleInputChange}
                    autoComplete={name}
                    name={name}
                    placeholder={`Enter ${name}`}
                />
                {!isValid && errorMessages[name] &&
                    <Alert variant='danger' className="error">
                        {errorMessages[name]}
                    </Alert>}
            </Form.Group>
        )
    }

    return (
        <div className='reset-container login'>
            <div className="header-login-div">
                <h1 className="display-1 heading-login rainbow-lr">&# Listen Yourself</h1>
            </div>
            <div id="app-login" className='center'>
                <h1>{C.connectionOptions[logInOrSignUp].text}</h1>

                {/* {logInOrSignUp === "login" && (
                    <>
                        <Login setIsLogged={setIsLogged} />
                        <p className="hr-text"><span>Or</span></p>
                    </>
                )} */}
                <Form onSubmit={handleSubmit}>
                    <div id="form-container">
                        {C.inputFields
                            .filter(item => item.scope.includes(logInOrSignUp))
                            .map(({name, type}) => renderFormInput(name, type))
                        }
                    </div>
                <Button id="log-submit" type="submit" className='spotify-green' variant="primary" >
                    { C.connectionOptions[logInOrSignUp].text }
                </Button>
                </Form>
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
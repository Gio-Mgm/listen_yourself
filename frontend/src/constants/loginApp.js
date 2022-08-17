// TODO remove default values
module.exports = Object.freeze({
    inputFields: [
        // {
        //     name: "username",
        //     type: "text",
        //     scope: ["signup"],
        //     value: "username"
        // },
        {
            name: "email",
            type: "email",
            scope: ["login", "signup"],
            value: "user@lambda.com"
        },
        {
            name: "password",
            type: "password",
            scope: ["login", "signup"],
            value: "password"
        },
        {
            name: "confirmation",
            type: "password",
            scope: ["signup"],
            value: "password"
        },
    ],
    errors: {
        username: "Invalid username",
        password: "Invalid password",
        passwordConfirmation: "Passwords doesn't match"
    },
    connectionOptions: {
        login: {
            text: "Log In",
            switch: "Don't have an account ? Click here for signup"
        },
        signup: {
            text: "Sign Up",
            switch: "Already have an account ? Click here for login"
        }
    }
})

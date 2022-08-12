/**
 * Check input values format before submit.
 * @param {Object} input form inputs
 * @param {String} log_type "login" or "signup"
 * @param {React.Dispatch<React.SetStateAction<{}>>} setErrorMessages useState setter for error messages
 * @return {bool} True if there is no error, else false
 */
const validate_form = (input, log_type,  setErrorMessages) => {
    let errors = {}
    let validityStatus = true
    if (input.username.length < 6) {
        validityStatus = false
        errors.username = "The name should contain more than 6 characters"
    }
    if (input.email && input.email.indexOf("@") === -1 ) {
        validityStatus = false
        errors.email = "The email should contain @"
    }
    if (input.password.length < 6) {
        validityStatus = false
        errors.password = "The password should contain more than 6 characters"
    }

    if (log_type === "signup" && input.password !== input.confirmation) {
        validityStatus = false
        errors.confirmation = "Confirmation doesn't match password"
    }

    setErrorMessages(errors)
    return validityStatus
}

export default validate_form
const fetchRequest = async (endpoint, args) => {
    const token = localStorage.getItem("access_token")
    const url = 'http://127.0.0.1:8000/api/' + endpoint
    console.log(args)
    const init = {
        crossDomain: true,
        method:'GET',
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "AccessToken": token,
            ...args
        }
    }

    const response = await fetch(url, init)
    return await response.json()
}

export default fetchRequest
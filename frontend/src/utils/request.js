import { API_PATH } from '../constants/global'

const fetchRequest = async (method, endpoint, data, headers) => {
    const url = API_PATH + endpoint
    const init = {
        crossDomain: true,
        method:method,
        mode: "cors",
    }
    if (headers) {
        init.headers = headers
    }
    if (method === "POST") {
        init.body = data
    }
    return await fetch(url, init)
}

export default fetchRequest
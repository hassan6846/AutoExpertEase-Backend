import axios from "axios"

//AXIOS INSTANCE
const ApiInstance = axios.create({
    baseURL: 'https://backend-autoexpertease-production-5fd2.up.railway.app/api',//Replace with any Current url
    header: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default ApiInstance;
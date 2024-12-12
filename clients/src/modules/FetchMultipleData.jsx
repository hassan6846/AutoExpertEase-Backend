import axios from "axios";

const fetchMultipleData=async(url)=>{
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);

    }
}
export default fetchMultipleData
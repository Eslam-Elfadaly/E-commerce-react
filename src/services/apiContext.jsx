import axios from 'axios';

const api = axios.create({
    baseURL:'https://dummyjson.com/products/category/'
})
export default api
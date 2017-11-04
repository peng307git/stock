import axios from 'axios'
import {HTTP_URL} from '../conf/index'



 const axios_init = axios.create({
    baseURL: HTTP_URL,
    headers: {'Content-Type': 'application/json'}
    });
export default axios_init

  
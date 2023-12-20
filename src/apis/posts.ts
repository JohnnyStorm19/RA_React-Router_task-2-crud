import axios from 'axios'
import { DEFAULT_URL } from '../globals'

export default axios.create({
    baseURL: DEFAULT_URL
})
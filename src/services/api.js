import axios from "axios"

const api = axios.create({
  baseURL: 'https://nice-pear-sparrow-suit.cyclic.app'
})

export default api;
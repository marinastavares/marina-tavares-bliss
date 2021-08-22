import axios from 'axios'
import humps from 'humps'

const API_URL = 'https://private-anon-707cfb57a2-blissrecruitmentapi.apiary-mock.com/'

axios.defaults.baseURL = API_URL

const camelizeResponse = (response) => response.data
const handleError = (error) => new Promise((resolve, reject) => reject(error.response.data))

export const get = (request, params) =>
  axios
    .get(request, { ...humps.decamelizeKeys(params) })
    .then(camelizeResponse)
    .catch(handleError)

export const post = (request, payload) =>
  axios
    .post(request, { params: humps.decamelizeKeys(payload) })
    .then(camelizeResponse)
    .catch(handleError)

export const put = (request, payload) =>
  axios
    .put(request, { ...humps.decamelizeKeys(payload) })
    .then(camelizeResponse)
    .catch(handleError)

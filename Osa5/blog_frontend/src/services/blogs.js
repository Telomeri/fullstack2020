import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `tokenmatch ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const request = axios.delete(`${baseUrl}/${newObject.id}`,  config )
  return request.then(response => response.data)
}


export default { setToken, getAll, create, update, remove }
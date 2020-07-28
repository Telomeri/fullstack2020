import axios from 'axios'
const baseUrl = '/api/persons'

const get_json = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add_json = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const delete_json = (newObject) => {
    const request = axios.delete(`${baseUrl}/${newObject.id}`)
    return request.then(response => response.data)
  }

const update_json = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  export default { get_json, add_json, delete_json, update_json}

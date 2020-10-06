import axios from 'axios'

const request = (url, params = {}, method = 'post') => {
  const baseUrl = ''

  if (method == 'get') {
    if (Object.keys(params).length != 0) {
      url += '?'

      Object.keys(params).forEach(i => {
        url += `${i}=${params[i]}&`
      })
      url = url.substring(0, url.length - 1)
    }

    return axios.get(baseUrl + url)
  }

  return axios.post(url, params)
}

export default request
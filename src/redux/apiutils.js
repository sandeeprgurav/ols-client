import {API_CONSTANT} from './dbConfig';
import { API } from "aws-amplify";

var formQueryString = (queryParamObj) => {
  var esc = encodeURIComponent;
  return Object.keys(queryParamObj)
      .map(k => esc(k) + '=' + esc(queryParamObj[k]))
      .join('&');
}

export const callAPI = async (url, method='GET', postData, queryParams) => {
    if(queryParams){
      url = url + '?' + formQueryString(queryParams)
    }
    let options = { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'apiToken': getLocalstorage('apiToken'),
      }}
    options['method'] = method
    if(postData) {
      options['body'] = JSON.stringify(postData)
    }
    return await fetch(API_CONSTANT + url, options).then(handleResponse);
}

function handleResponse(res) {
  if(res.ok) {
    if(res.headers.get("Content-Type") == "text/html;charset=UTF-8") {
      return  res.text()
    } else {
      return res.json().then(json => json)
    }
  } else if(res.status == 404) {
    return Promise.resolve(Object.assign({}, res, {
          status: res.status,
          statusText: res.error
        }));
  } else {
    return Promise.reject(Object.assign({}, res, {
          status: res.status,
          statusText: res.error
        }))
  }
}

function getLocalstorage(name) {
  return localStorage.getItem(name);
}

export const callServerlessAPI = async (key,url) => {
  return await API.get(key, url);
}

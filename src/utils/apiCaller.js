import axios from 'axios';

export default function callApi(headers,endPoint, method = 'GET', body) {
    return axios({
        headers,
        method,
        url: `https://todo-nodejs.herokuapp.com/${endPoint}`,
        data: body
    })
    .catch(err => {
        return err
    })
}
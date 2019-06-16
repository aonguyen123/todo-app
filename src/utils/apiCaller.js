import axios from 'axios';

export default function callApi(headers,endPoint, method = 'GET', body) {
    return axios({
        headers,
        method,
        url: `/${endPoint}`,
        data: body
    })
    .catch(err => {
        return err
    })
}
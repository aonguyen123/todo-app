import React, { Component } from 'react';
import callApi from './../../utils/apiCaller';

class LoginViaFace extends Component {
    loginFace = () => {
        console.log('click');
        callApi(null, 'auth/facebook','GET', null).then(res => {
            console.log(res);
        })
    }
    render() {
        return (
            <div className="social-buttons">
                <a href="http://localhost:4000/auth/facebook" className="btn btn-primary"><i className="fa fa-facebook"></i>&nbsp;Facebook</a>
            </div>
        );
    }
}

export default LoginViaFace;
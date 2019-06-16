import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import callApi from './../../utils/apiCaller';
import LoadingSmall from './../Loader/LoadingSmall';
import { setTokenInStorage } from './../../utils/storage';
import showAlert from './../../utils/alert';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingSmall: false,
            txtemail: '',
            txtpassword: '',
            userNotFound: false,
            wrongPassword: false
        }
    }
    isChange = (e) => {
       let target = e.target;
       let name = target.name;
       let value = target.type === 'checkbox' ? target.checked : target.value;
       this.setState({
           [name]: value
       })
    }
    login = (e) => {
        e.preventDefault();
        this.setState({
            isLoadingSmall: true
        })
        let { txtemail, txtpassword } = this.state;
        callApi(null, 'auth/signin', 'POST', {
            email: txtemail,
            password: txtpassword
        }).then(res => res.data).then(json => {
            if(json.message === 'Login failed. User not found')
            {
                this.setState({
                    userNotFound: true,
                    isLoadingSmall: false
                })
            }
            else if(json.message === 'Login failed. Wrong password')
            {
                this.setState({
                    wrongPassword: true,
                    isLoadingSmall: false
                })
            }
            else
            {
                setTokenInStorage('tokenUser', json.token);
                this.props.history.push('/');
            }
        })
    }
    showAlert = () => {
        if(this.state.userNotFound)
        {
            return showAlert(() => {this.setState({userNotFound: false})}, [{id:1, type: 'danger', headline: 'Error', message: 'Tài khoản không tồn tại'}], 4000);
        }
        else if(this.state.wrongPassword)
        {
            return showAlert(() => {this.setState({wrongPassword: false})}, [{id:2, type: 'warning', headline: 'Error', message: 'Mật khẩu không chính xác'}], 4000);
        }
    }
    showLoading = () => {
        if(this.state.isLoadingSmall)
        {
            return <LoadingSmall />
        }
        return null;
    }
    render() {
        let { txtemail, txtpassword } = this.state;
        return (
            <React.Fragment>
                {this.showAlert()}
                {this.showLoading()}
                <form className="form" id="login-nav" onSubmit={this.login}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email address" 
                            name="txtemail" 
                            value={txtemail}
                            onChange={this.isChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password"     
                            className="form-control" 
                            placeholder="Password" 
                            name="txtpassword" 
                            value={txtpassword}
                            onChange={this.isChange}
                            required 
                        />
                        <div className="help-block text-right"><Link to="/signup">Đăng kí</Link></div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default withRouter(SignInForm);
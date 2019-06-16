import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoadingSmall from './../Loader/LoadingSmall';
import callApi from './../../utils/apiCaller';
import showAlert from './../../utils/alert';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingSmall: false,
            firstName: '',
            lastName: '',
            txtemail: '',
            txtpassword: '',
            statusRegister: false,
            statusUserExits: false
        }
    }
    isChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }
    register = (e) => {
        e.preventDefault();
        this.setState({
            isLoadingSmall: true
        })
        let {firstName, lastName, txtemail, txtpassword} = this.state;
        callApi(null, 'register', 'POST', {
            firstName,
            lastName,
            email: txtemail,
            password: txtpassword
        }).then(res => res.data).then(json => {
            if(json.user)
            {
                this.setState({
                    statusRegister: true,
                    isLoadingSmall: false
                })
            }
            else if (json.message === 'user exits')
            {
                this.setState({
                    statusUserExits: true,
                    isLoadingSmall: false
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    showLoading = () => {
        if(this.state.isLoadingSmall)
        {
            return <LoadingSmall />
        }
        return null;
    }
    showAlert = () => {
        if(this.state.statusRegister)
        {
            return showAlert(
                ()=>{this.setState({statusRegister: false})},
                [{type: 'success', headline: 'Success', message: 'Đăng kí tài khoản thành công'}], 
                3000, 
                'top-right'
            );
        }
        else if(this.state.statusUserExits)
        {
            return showAlert(
                ()=>{this.setState({statusUserExits: false})},
                [{type: 'danger', headline: 'Eror', message: 'Email đã tồn tại'}], 
                3000, 
                'top-right'
            );
        }
    }
    render() {
        let { firstName, lastName, txtemail, txtpassword } = this.state;
        return (
            <React.Fragment>
                {this.showLoading()}
                {this.showAlert()}
                <form className="form" id="login-nav" onSubmit={this.register}>
                    <div className="form-group">
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    className="form-control" 
                                    placeholder="First Name" 
                                    required 
                                    value={firstName}
                                    onChange={this.isChange}
                                />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    className="form-control" 
                                    placeholder="Last Name" 
                                    required 
                                    value={lastName}
                                    onChange={this.isChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="txtemail" 
                                className="form-control" 
                                placeholder="Email address" 
                                required 
                                value={txtemail}
                                onChange={this.isChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                name="txtpassword" 
                                className="form-control" 
                                placeholder="Password" 
                                required 
                                value={txtpassword}
                                onChange={this.isChange}
                            />
                            <div className="help-block text-right"><Link to="/signin">Đăng nhập</Link></div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Đăng kí</button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default withRouter(SignUpForm);
import React, { Component } from 'react';
import SignUpForm from './../../Components/SignUpForm/SignUpForm';

class SignUpPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 centerLogin">
                            
                            <div className="page-header text-center mg-top">
                              <h1><small>Đăng kí</small></h1>
                            </div>
                            
                            <SignUpForm />    
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SignUpPage;
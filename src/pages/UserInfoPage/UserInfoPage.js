import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './../../Components/Header/Header';
import Loading from './../../Components/Loader/Loading';
import callApi from './../../utils/apiCaller';
import { getTokenFromStorage } from './../../utils/storage';

class UserInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            authData: ''
        }
    }
    componentDidMount() {
        const token = getTokenFromStorage('tokenUser');
        callApi({'Authorization': token ? 'bearer '+ token : undefined}, 'api/auth/user', 'GET', null).then(res => res.data).then(json => {
            if(json.message === 'not logged in')
            {
                this.props.history.push('/signin');
            }
            else
            {
                if(json.authData)
                {
                    this.setState({
                        isLoading: false,
                        authData: json.authData.user.local
                    })
                }
            }
        })
    }
    
    render() {
        let { isLoading, authData } = this.state;
        if(isLoading)
        {
            return <Loading />
        }
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="panel panel-warning">
                                <div className="panel-heading">
                                    <h3 className="panel-title text-center">Thông tin tài khoản</h3>
                                </div>
                                <div className="panel-body">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <h2>{`${authData.lastName} ${authData.firstName}`}</h2>
                                            <p><strong>First name: </strong>{authData.firstName}.</p>
                                            <p><strong>Last name: </strong>{authData.lastName}. </p>
                                            <p><strong>Email: </strong>{authData.email}.</p>
                                        </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(UserInfoPage);
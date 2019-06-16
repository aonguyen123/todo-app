import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './../../Components/Loader/Loading';

class LogoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
       localStorage.removeItem('tokenUser');
       this.props.history.push('/signin');
    }
    
    render() {
        let { isLoading } = this.state;
        if(isLoading)
        {
            return <Loading />
        }
    }
}

export default withRouter(LogoutPage);
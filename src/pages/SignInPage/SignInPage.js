import React, { Component } from 'react';
import SignInForm from '../../Components/SignInForm/SignInForm';
import Loading from './../../Components/Loader/Loading';
import { getTokenFromStorage } from './../../utils/storage';
import { withRouter } from 'react-router-dom';

class SignInPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}
	componentDidMount() {
		const token = getTokenFromStorage('tokenUser');
		if(token)
		{
			this.props.history.push('/');
		}
		else
		{
			this.setState({
				isLoading: false
			})
		}
	}
	
	render() {
		let { isLoading } = this.state;
		if(isLoading)
		{
			return <Loading />
		}
		return (
			<React.Fragment>
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-4 centerLogin">
							<div className="page-header text-center mg-top">
							  <h1><small>Đăng nhập</small></h1>
							</div>
							<SignInForm />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(SignInPage);
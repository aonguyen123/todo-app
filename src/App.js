import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import {getTokenFromStorage} from './utils/storage';
import Loading from './Components/Loader/Loading';
import routes from './routes/routes';


class App extends Component {
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
			this.setState({
				isLoading: false
			})
		}
		else
		{
			this.setState({
				isLoading: false
			})
			
		}
	}
	render() {
		const { isLoading } = this.state;
		if (isLoading) {
			return <Loading />
		}
		return (
			<Router>
				<div className="App">
					<Switch>
						{this.showRouter(routes)}
					</Switch>
				</div>
			</Router>
		)
	}
	showRouter = (routes) => {
		let result = null;
		if(routes.length > 0)
		{
			result = routes.map((route, key) => {
				return (
					<Route 
						key={key}
						path={route.path}
						exact={route.exact}
						component={route.main}
					/>
				);
			});
		}
		return result;
	}
}

export default App;

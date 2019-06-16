import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './../../Components/Header/Header';
import Footer from './../../Components/Footer/Footer';
import AddTodoForm from './../../Components/AddTodoForm/AddTodoForm';
import { getTokenFromStorage } from './../../utils/storage';
import callApi from './../../utils/apiCaller';
import Loading from './../../Components/Loader/Loading';
class AddTodoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            stateTenCV:'',
            isLoading: true,
            idUser: '',
        }
    }
    
    componentDidMount() {
        const token = getTokenFromStorage('tokenUser');
        callApi({'Authorization': token ? 'bearer '+token : undefined}, 'api/auth/user', 'GET', null)
        .then(res => res.data).then(json => {
            if(json.message === 'not logged in')
            {
                this.props.history.push('/signin');
            }
            else
            {
                if(json.authData)
                {
                    const id = this.props.match.params.id;
                    const stateTenCV = this.props.location.state;
                    id && stateTenCV === undefined ? this.props.history.goBack() : this.setState({
                        idUser: json.authData.user._id,
                        isLoading: false,
                        id,
                        stateTenCV
                    })
                }
            }
        })
    }
    
    render() {
        let { isLoading, idUser, id, stateTenCV } = this.state;
        const title = id ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'
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
                            <div className="jumbotron">
                                <div className="flex-container">
                                    <div>
                                        <h2>{title}</h2>
                                        <AddTodoForm 
                                            idUser={idUser} 
                                            id={id}
                                            stateTenCV={stateTenCV}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(AddTodoPage);
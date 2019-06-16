import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import callApi from './../../utils/apiCaller';
import { formatDate } from './../../utils/formatDate';
import LoadingSmall from './../Loader/LoadingSmall';
import { getTokenFromStorage } from './../../utils/storage';

class AddTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtTenCV: '',
            isLoadingSmall: false,
            id: '',
            activePage: ''
        }
    }

    componentWillMount() {
        const { id, stateTenCV } = this.props;
        this.setState({
            id,
            txtTenCV: stateTenCV === undefined ? '' : stateTenCV.tenCV,
            activePage: stateTenCV === undefined ? '' : stateTenCV.activePage,
        })
    }

    isChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }
    saveTodo = (e) => {
        e.preventDefault();
        this.setState({
            isLoadingSmall: true
        })
        const token = getTokenFromStorage('tokenUser');
        const { txtTenCV, id, activePage } = this.state;
        const { idUser } = this.props;
        if (id) {
            callApi({ 'Authorization': token ? 'bearer ' + token : undefined }, 'api/updateTenCV', 'PUT', {
                tenCV: txtTenCV, id
            }).then(res => res.data).then(json => {
                if (json.message === 'not logged in') {
                    this.props.history.push('/signin');
                }
                else
                {
                    if(json.message === 'update complete')
                    {
                        this.props.history.push({
                            pathname: '/',
                            state: activePage
                        });
                    }
                }
            })
        }
        else {
            let date = new Date();
            let dateNew = formatDate(date);
            callApi({'Authorization': token ? 'bearer: '+token : undefined}, `api/addTodo/${idUser}`, 'POST', { tenCV: txtTenCV, date: dateNew })
                .then(res => res.data)
                .then(json => {
                    if(json.message === 'not logged in')
                    {
                        this.props.history.push('/signin');
                    }
                    else
                    {
                        if (json.todoNew) {
                            this.props.history.push('/');
                        }
                    }
                })
        }
    }
    render() {
        const { txtTenCV, isLoadingSmall, id } = this.state;
        const titleButton = id ? 'Cập nhật' : 'Thêm mới';
        if (isLoadingSmall) {
            return <LoadingSmall />
        }
        return (
            <React.Fragment>
                <form className="form-inline" onSubmit={this.saveTodo}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên công việc..."
                            required
                            name="txtTenCV"
                            value={txtTenCV}
                            onChange={this.isChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">{titleButton}</button>
                </form>
            </React.Fragment>
        );
    }
}

export default withRouter(AddTodoForm);
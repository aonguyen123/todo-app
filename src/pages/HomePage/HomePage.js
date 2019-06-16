import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import TodoList from '../../Components/TodoList/TodoList';
import Header from './../../Components/Header/Header';
import Footer from './../../Components/Footer/Footer';
import Loading from '././../../Components/Loader/Loading';
import LoadingSmall from './../../Components/Loader/LoadingSmall';
import { getTokenFromStorage } from './../../utils/storage';
import callApi from './../../utils/apiCaller';
import TodoItem from './../../Components/TodoItem/TodoItem';
import Pagination from 'react-js-pagination';
import showAlert from './../../utils/alert';

class HomePage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoadingSmall: false,
            idUser: '',
            todos: [],
            statusIsDone: false,
            statusDeleteTodo: false,
            activePage: 1,
            itemsCountPerPage: 6,//size , so item hien thi
            totalItemsCount: '',
            pageNum: 1
        }
    }
    componentDidMount() {
        this._isMounted = true;
        const token = getTokenFromStorage('tokenUser');
        callApi({ 'Authorization': token ? "bearer " + token : undefined }, 'api/auth/user', 'GET', null).then(res => res.data).then(json => {
            if (json.message === 'not logged in') {
                this.props.history.push('/signin');
            }
            else {
                if (json.authData) {
                    this.setState({
                        isLoading: false,
                        isLoadingSmall: true,
                        idUser: json.authData.user._id
                    })
                    const activePage = this.props.location.state !== undefined ? this.props.location.state : 1;
                    callApi({ 'Authorization': token ? "bearer " + token : undefined }, `api/getAllTodoByUser/${json.authData.user._id}?pageNum=${activePage}&size=${this.state.itemsCountPerPage}`, 'GET', null)
                        .then(res => res.data).then(json => {
                            if (this._isMounted) {
                                this.setState({
                                    todos: json.todos,
                                    totalItemsCount: json.totalCount,
                                    isLoadingSmall: false,
                                    activePage: this.props.location.state === undefined ? 1 : this.props.location.state
                                })
                            }
                        })
                }
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            isLoadingSmall: true,
            pageNum: pageNumber,
            activePage: pageNumber
        })
        const { idUser, itemsCountPerPage } = this.state;
        const token = getTokenFromStorage('tokenUser');
        callApi({ 'Authorization': token ? "bearer " + token : undefined }, `api/getAllTodoByUser/${idUser}?pageNum=${pageNumber}&size=${itemsCountPerPage}`, 'GET', null)
            .then(res => res.data).then(json => {
                this.setState({
                    todos: json.todos,
                    activePage: pageNumber,
                    totalItemsCount: json.totalCount,
                    isLoadingSmall: false
                })
            })
    }
    todoDone = (idTodo) => {
        this.setState({
            isLoadingSmall: true
        })
        const token = getTokenFromStorage('tokenUser');
        const { idUser, activePage, itemsCountPerPage } = this.state;
        callApi({ 'Authorization': token ? 'bearer ' + token : undefined }, `api/updateIsDone`, 'POST', {
            idTodo, idUser, pageNum: activePage, size: itemsCountPerPage
        })
            .then(res => res.data)
            .then(json => {
                if (json.message === 'page end') {
                    this.setState({
                        isLoadingSmall: false,
                        todos: json.todos,
                        activePage: 1,
                        totalItemsCount: json.totalCount,
                        statusIsDone: true
                    })
                }
                else {
                    this.setState({
                        todos: json.todos,
                        activePage: activePage,
                        totalItemsCount: json.totalCount,
                        isLoadingSmall: false,
                        statusIsDone: true
                    })
                }
            })
    }
    showStatus = () => {
        if (this.state.statusIsDone) {
            return showAlert(() => { this.setState({ statusIsDone: false }) }, [{ id: 1, type: 'success', headline: 'Success', message: 'Công việc đã hoàn thành' }], 3000, 'bottom-right');
        }
        if (this.state.statusDeleteTodo) {
            return showAlert(
                () => { this.setState({ statusDeleteTodo: false }) },
                [{ id: 2, type: 'danger', headline: 'Success', message: 'Xóa công việc thành công' }],
                3000,
                'bottom-right'
            );
        }
    }
    render() {
        let { isLoading, todos, activePage, totalItemsCount } = this.state;
        if (isLoading) {
            return <Loading />
        }
        return (
            <React.Fragment>
                {this.showStatus()}
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Link to="/addTodo" className="btn btn-success mb-10">Thêm công việc</Link>
                            <TodoList>{this.showTodoItem(todos, activePage)}</TodoList>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="flex-container">
                                {this.showPagination(todos, activePage, totalItemsCount)}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
    deleteTodo = (idTodo) => {
        this.setState({
            isLoadingSmall: true,
        })
        const token = getTokenFromStorage('tokenUser');
        const { idUser, activePage, itemsCountPerPage } = this.state;
        callApi({ 'Authorization': token ? 'bearer: ' + token : undefined }, 'api/deleteTodoDone', 'DELETE', {
            idTodo, pageNum: activePage, idUser, size: itemsCountPerPage, statusDelete: 'todoNotDone'
        })
            .then(res => res.data)
            .then(json => {
                if (json.message === 'page end') {
                    this.setState({
                        isLoadingSmall: false,
                        todos: json.todos,
                        activePage: 1,
                        totalItemsCount: json.totalCount,
                        statusDeleteTodo: true
                    })
                }
                else {
                    this.setState({
                        todos: json.todos,
                        activePage: activePage,
                        totalItemsCount: json.totalCount,
                        isLoadingSmall: false,
                        statusDeleteTodo: true
                    })
                }
            })
    }
    showPagination = (todos, activePage, totalItemsCount) => {
        const { itemsCountPerPage } = this.state;
        if (todos.length === 0 || totalItemsCount === itemsCountPerPage || totalItemsCount < itemsCountPerPage) {
            return null;
        }
        return <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage} //size, so item hien thi
            totalItemsCount={totalItemsCount} //tong so item
            pageRangeDisplayed={4}
            onChange={this.handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
        />
    }
    showTodoItem = (todos, activePage) => {
        if (this.state.isLoadingSmall) {
            return <tr><td colSpan="6"><LoadingSmall /></td></tr>;
        }
        let result = <tr><td colSpan="6">Chưa có công việc nào</td></tr>;
        if (todos.length > 0) {
            result = todos.map((value, key) => {
                return <TodoItem
                    key={key}
                    todo={value}
                    todoDone={(idTodo) => this.todoDone(idTodo)}
                    deleteTodo={(idTodo) => this.deleteTodo(idTodo)}
                    activePage={activePage}
                />
            })
        }
        return result;
    }
}
export default withRouter(HomePage);
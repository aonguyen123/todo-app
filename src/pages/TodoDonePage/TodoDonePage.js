import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Header from './../../Components/Header/Header';
import Footer from './../../Components/Footer/Footer';
import TodoDoneList from './../../Components/TodoDoneList/TodoDoneList';
import Loading from './../../Components/Loader/Loading';
import LoadingSmall from './../../Components/Loader/LoadingSmall';
import { getTokenFromStorage } from './../../utils/storage';
import callApi from './../../utils/apiCaller';
import TodoDoneItem from './../../Components/TodoDoneItem/TodoDoneItem';
import showAlert from '../../utils/alert';

class TodoDonePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            isLoading: true,
            isLoadingSmall: false,
            idUser: '',
            itemsCountPerPage: 6,//size , so item hien thi
            totalItemsCount: '',
            activePage: 1,
            pageNum: 1,
            statusDelete: false
        }
    }
    componentDidMount() {
        const token = getTokenFromStorage('tokenUser');
        callApi({ 'Authorization': token ? 'bearer ' + token : undefined }, 'api/auth/user', 'GET', null)
            .then(res => res.data)
            .then(json => {
                if (json.message === 'not logged in') {
                    this.props.history.push('/signin');
                }
                else {
                    if (json.authData) {
                        this.setState({
                            isLoading: false,
                            idUser: json.authData.user._id,
                            isLoadingSmall: true
                        })
                        callApi({'Authorization': token ? 'bearer '+token : undefined}, `api/getAllTodoDoneByUser/${json.authData.user._id}?pageNum=1&size=${this.state.itemsCountPerPage}`, 'GET', null)
                        .then(res => res.data)
                        .then(json => {
                            this.setState({
                                todos: json.todos,
                                totalItemsCount: json.totalCount,
                                isLoadingSmall: false
                            })
                        })
                    }
                }
            })
    }

    render() {
        const { isLoading, todos, activePage, totalItemsCount } = this.state;
        if (isLoading) {
            return <Loading />
        }
        return (
            <React.Fragment>
                {this.checkStatusDelete()}
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <TodoDoneList>{this.showTodoItem(todos)}</TodoDoneList>
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
    showTodoItem = (todos) => {
        if(this.state.isLoadingSmall)
        {
            return <tr><td colSpan="5"><LoadingSmall /></td></tr>;
        }
        let result = <tr><td className="text-center" colSpan="5">Chưa có công việc hoàn thành</td></tr>;
        if(todos.length > 0)
        {
            result = todos.map((value, key) => {
                return <TodoDoneItem 
                            key={key}
                            todo={value}
                            deleteTodoDone={(idTodo)=>this.deleteTodoDone(idTodo)}
                        />
            })
        }
        return result;
    }
    handlePageChange = (pageNumber) => {
        this.setState({
            isLoadingSmall: true,
            pageNum: pageNumber
        })
        const { idUser, itemsCountPerPage } = this.state;
        const token = getTokenFromStorage('tokenUser');
        callApi({ 'Authorization': token ? "bearer " + token : undefined }, `api/getAllTodoDoneByUser/${idUser}?pageNum=${pageNumber}&size=${itemsCountPerPage}`, 'GET', null)
            .then(res => res.data).then(json => {
                this.setState({
                    todos: json.todos,
                    activePage: pageNumber,
                    totalItemsCount: json.totalCount,
                    isLoadingSmall: false
                })
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
    deleteTodoDone = (idTodo) => {
        this.setState({
            isLoadingSmall: true,
        })
        const token = getTokenFromStorage('tokenUser');
        const { idUser, pageNum, itemsCountPerPage } = this.state;
        callApi({'Authorization': token ? 'bearer: '+token : undefined}, 'api/deleteTodoDone', 'DELETE', {
            idTodo, pageNum, idUser, size: itemsCountPerPage, statusDelete: 'todoDone'
        })
        .then(res => res.data)
        .then(json => {
            if(json.message === 'page end')
            {
                this.setState({
                    isLoadingSmall: false,
                    todos: json.todos,
                    activePage: 1,
                    totalItemsCount: json.totalCount,
                    statusDelete: true
                })
            }
            else
            {
                this.setState({
                    todos: json.todos,
                    activePage: pageNum,
                    totalItemsCount: json.totalCount,
                    isLoadingSmall: false,
                    statusDelete: true
                })
            }
        })
    }
    checkStatusDelete = () => {
        if(this.state.statusDelete)
        {
            return showAlert(()=>{this.setState({statusDelete: false})}, [{id: 1, type: "danger", headline: 'Success', message: 'Xóa công việc thành công'}], 3000, 'bottom-right');
        }
        return null;
    }
}

export default withRouter(TodoDonePage);
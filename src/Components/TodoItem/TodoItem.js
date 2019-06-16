import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TodoItem extends Component {

    render() {
        let { todo, todoDone, deleteTodo, activePage } = this.props;
        let status = todo.isDone ? 'Hoàn thành' : 'Chưa hoàn thành';
        return (
            <React.Fragment>
                <tr>
                    <td>
                        <input
                            type="checkbox"
                            onChange={() => todoDone(todo._id)}
                        />
                    </td>
                    <td>{todo.tenCV}</td>
                    <td>{todo.date}</td>
                    <td>
                        <span className="label label-danger">{status}</span>
                    </td>
                    <td>
                        <Link to={{pathname: `/editTodo/${todo._id}`, state:{tenCV: todo.tenCV, activePage}}} className="btn btn-primary mr-10">Sửa</Link>
                        <button 
                            type="button" 
                            onClick={()=>deleteTodo(todo._id)}
                            className="btn btn-danger">Xóa
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default TodoItem;
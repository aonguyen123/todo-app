import React, { Component } from 'react';

class TodoDoneItem extends Component {
    render() {
        const {todo, deleteTodoDone} = this.props;
        const status = todo.isDone ? 'Hoàn thành' : 'Chưa hoàn thành';
        return (
            <React.Fragment>
                <tr>
                    <td>{todo.tenCV}</td>
                    <td>{todo.date}</td>
                    <td>
                        <span className="label label-success">{status}</span>
                    </td>
                    <td>
                        <button 
                            type="button" 
                            onClick = {() => deleteTodoDone(todo._id)}
                            className="btn btn-danger">Xóa
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default TodoDoneItem;
import React, { Component } from 'react';

class EditTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtTenCV: '',
            idTodo: ''
        }
    }
    componentDidMount() {
        const { tenCV, idTodo } = this.props;
        this.setState({
            txtTenCV: tenCV,
            idTodo
        })
    }
    
    isChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }
    updateTodo = (e, idTodo) => {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        const { txtTenCV, idTodo } = this.state;
        return (
            <React.Fragment>
                <form className="form-inline" onSubmit={this.addTodo}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            required
                            name="txtTenCV"
                            value={txtTenCV}
                            onChange={this.isChange}
                        />
                    </div>
                    <button onClick={(e) => this.updateTodo(e, idTodo)} type="submit" className="btn btn-primary">Cập nhật</button>
                </form>
            </React.Fragment>
        );
    }
}

export default EditTodoForm;
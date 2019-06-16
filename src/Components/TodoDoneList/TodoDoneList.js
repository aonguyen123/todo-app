import React, { Component } from 'react';

class TodoDoneList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">Danh sách công việc hoàn thành</h3>
                    </div>
                    <div className="panel-body pn-body">

                        <div className="table-responsive">
                            <table className="table table-hover table-bordered table-striped tbDone">
                                <thead>
                                    <tr>
                                        <th>Tên công việc</th>
                                        <th>Ngày đăng</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.children}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TodoDoneList;
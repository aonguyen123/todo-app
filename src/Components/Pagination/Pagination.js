import React, { Component } from 'react';

class Pagination extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pagi">
                    <ul className="pagination">
                        <li><a href="foo">&laquo;</a></li>
                        <li><a href="foo">1</a></li>
                        <li><a href="foo">2</a></li>
                        <li><a href="foo">3</a></li>
                        <li><a href="foo">4</a></li>
                        <li><a href="foo">5</a></li>
                        <li><a href="foo">&raquo;</a></li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Pagination;
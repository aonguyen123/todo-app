import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/" className="navbar-brand">Quản lý công việc</Link>
                </div>
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/todoDoneList">Công việc đã hoàn thành</Link></li>
                        <li><Link to={{pathname: '/userinfo'}}>Thông tin tài khoản</Link></li>
                        <li><Link to="/logout">Đăng xuất</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
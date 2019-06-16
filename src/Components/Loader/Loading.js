import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }
}

export default Loading;
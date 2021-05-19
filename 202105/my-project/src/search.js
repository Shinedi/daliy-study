

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less'
import logo from './images/go1.png';

class Search extends React.Component {

    render() {
        return <div className="search-text">
            <img src={logo} />
            搜索文字内
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);
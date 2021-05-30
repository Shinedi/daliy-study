

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less' 
import logo from './images/logo.png';

class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }
    loadComponent () {
        import('./text.js').then(text => {
            this.setState({
                Text: Text.default
            })
        })
    }
    render() {
        const {Text} = this.state
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            <img src={logo} onClick={this.loadComponent.bind(this)}/>
            搜索文字内
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);
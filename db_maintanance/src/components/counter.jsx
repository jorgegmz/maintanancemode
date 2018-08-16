import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../images/certonalogo.png';
import {Dropdown, DropdownToggle, DropdownItem} from 'reactstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

class Counter extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            count: 0,
            dropdownOpen: true
        };
    }

    toggle(){
        this.setState(prevState =>({

            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    increment = () => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/hello');
        xhr.onload = function() {
            document.getElementById("demo").innerHTML = xhr.responseText;
                  }
                  xhr.send()
        //return this.setState(count) = this.state.count + 1;
    }

    decrement = () => {
        this.setState({count: this.state.count - 1});
    }

    render () {
        return (
            <div>
                <div>
                    <view>
                    <img src={logo} alt="logo" class="center"/>
                    </view>
                </div>
                <Dropdown>
                <DropdownMenu>
                    <MenuItem text='Home'>Test</MenuItem>
                </DropdownMenu>
                    </Dropdown>
                <h1 >Hello World</h1>
                {/*<h1>{ this.state.count }</h1>*/}
                {/*<span>{ this.state.count }</span>*/}
               <div class="container">
               <div id="demo">
                   <button onClick={ this.increment}>Enable Maintanance Mode</button>
               </div>
                <button onClick={ this.decrement}>Disable Maintanance Mode</button>
            </div>
            </div>
        );
    }


}

export default Counter;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../images/certonalogo.png';
import {Dropdown, DropdownToggle, DropdownItem} from 'reactstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import Select from 'react-select';

class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            selectedServer: "",
            scaryAnimals:[]
        };
        this.populateDropdown();
    }

    setDropdown = (val) => {
        this.setState({selectedServer: val.label});
        return this.state.selectedServer;
    };

    // TODO: need to change open('GET') to open('PUT') with value selected from dropdown
    enableMaintenance = () => {
        var xhr = new XMLHttpRequest();
        let self = this;
        let server = self.state.selectedServer;
        console.log(server)
        xhr.open('GET', 'http://localhost:5000/dbenablemain/'+server);
        xhr.onload = function() {
            xhr.responseText
            console.log(xhr.responseText);
            //document.getElementById("enableMode").innerHTML = xhr.responseText;
        };
        xhr.send()
    };

    // TODO: still needs a lot of work. Reverse of enableMaintenance mode function.
    disableMaintenance = () => {
        var xhr = new XMLHttpRequest();
        let self = this;
        let server = self.state.selectedServer;
        console.log(server)
        xhr.open('GET', 'http://localhost:5000/dbdisablemain/'+server);
        xhr.onload = function() {
            xhr.responseText
            console.log(xhr.responseText);
            //document.getElementById("disableMode").innerHTML = xhr.responseText;
        };
        xhr.send()
    };

    populateDropdown = () => {
        let xhr = new XMLHttpRequest();
        let parsedjson = "";
        let servers = [];
        let jsonObj;
        let self = this;
        xhr.open('GET', 'http://localhost:5000/dbservers');
        xhr.onload = function () {
            //console.log(xhr.response);
            parsedjson = JSON.parse(xhr.response);
            for(let i = 0; i < parsedjson.task.length; ++i){
                jsonObj = {"label":parsedjson.task[i].label.toString(), "value":parsedjson.task[i].value.toString()};
                servers.push(jsonObj);
            }
            self.setState({scaryAnimals: servers});
        };
        xhr.send();
    };

    render () {
        return (
            <div>
                <div>
                    <view>
                        <img src={logo} alt="logo" className="center"/>
                    </view>
                </div>
                <div><Select id="server" options={this.state.scaryAnimals} onChange={this.setDropdown.bind(this)}/></div>
                <h1 >Hello World</h1>
                <div className="container">
                    <div id="enableMode">
                        <button onClick={ this.enableMaintenance}>Enable Maintenance Mode</button>
                    </div>
                    <div id="disableMode">
                    <button onClick={ this.disableMaintenance}>Disable Maintenance Mode</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Counter;

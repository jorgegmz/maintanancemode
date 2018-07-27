import React from 'react';
import ReactDOM from 'react-dom';
import App from './index.css';
import registerServiceWorker from './registerServiceWorker';
import logo from './certonalogo.png';

const options = [{value: 'one', label: 'One'},{value: 'two', label: 'Two'}];

const defaultOption = [{value: 'did not', label: 'Work'}];

function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}

function displayButton(){
    return <button>Click Me</button>;
}

const user = {
    firstName: 'Jorge',
    lastName: 'Gomez'
};

function getGreeting(user){
    if(user) {
        //return <h1>Hello, {formatName(user)}//!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

const tempvar = (
    <h1>
        {getGreeting(user)}
    </h1>
);

const element = (
    <div>
        <img src={logo} alt="logo"></img>
        {displayButton()}
        <Welcome name="Sara"/>;
        {tempvar}
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
);

var createReactClass = require('create-react-class');

var MySelect = createReactClass({
    getInitialState: function() {
        return {
            value: 'todo'
        }
    },
    change: function(event){
        this.setState({value: event.target.value});
    },
    render: function(){
        return(
            <div>
                <img src={logo} alt="logo"></img>
                <p></p>
                <select id="lang" onChange={this.change} value={this.state.value}>
                    <option value="select">Select</option>
                    <option value="Jave">Java</option>
                    <option value="C++">C++</option>
                    <option value="Spark">Spark</option>
                    <option value="Hadoop">Hadoop</option>
                </select>
                <p></p>
                <p>{this.state.value}</p>
                {displayButton()}
            </div>
        );
    }
});

//React.render(<MySelect />, document.body);

ReactDOM.render(
    <MySelect />,
    //element,
    document.getElementById('root')
);

import React from 'react';
import ReactDom from 'react-dom';

const testData = [
    {display: "One", id: 1 },
    {display: "Two", id: 2 },
    {display: "Apples", id: 3 },
    {display: "Oranges", id: 4 }
];

function toxicProxy(time, errorRate, target, callback) {
    const timeout = Math.random()*time/2 + Math.random()*time/2 + time/2;
    setTimeout(() => {
        if (Math.random() < errorRate) {
            callback("An error occurred");
        } else {
            callback(null, target());
        }
    }, timeout);
}

function loadData(location, callback) {
    toxicProxy(500, 0.2, () => testData, callback);
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: window.location.hash,
            items: null,
            error: null
        };
    }

    componentWillMount() {
        this.fetchData();
        window.addEventListener('hashchange', () => {
            this.setState({location: window.location.hash});
        }, false);
    }

    fetchData = () => {
        this.setState({items: null, error: null});
        loadData(this.state.location, (error, items) => this.setState({error, items}));
    }

    render() {
        const {items, error, location} = this.state;

        var list;
        if (items) {
            list = testData.map((item,index) => 
                <li key={index}><a href={'#/' + item.id }>{item.display}</a></li>
            );
        } else if (error) {
            list = <div>An error occurred: {error}</div>;
        } else {
            list = <div>Loading...</div>
        }

        return (
            <div>
                <h2>Hello world {location}</h2>
                <ul>{list}</ul>
                <button onClick={this.fetchData}>Reload</button>
            </div>
        );
    }
}

const application = <Application />
ReactDom.render(application, document.getElementById('app'))


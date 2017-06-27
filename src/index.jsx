import React from 'react';
import ReactDom from 'react-dom';

class Application extends React.Component {
    render() {
        return (
            <div>
                <h2>Hello world</h2>
            </div>
        );
    }
}

const application = <Application />
ReactDom.render(application, document.getElementById('app'))

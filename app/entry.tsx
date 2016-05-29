/// <reference path="../typings/index.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ConnectedTodoApp from './containers/ConnectedTodoApp.redux';
import {Provider} from 'react-redux';
import store from './Models/Store';

import '../css/base.css';
import '../css/app.css';

class Dummy extends React.Component<{}, {}> { }

ReactDOM.render(
    <Provider store={store}>
        <ConnectedTodoApp />
    </Provider>,
    document.getElementById('content')
);
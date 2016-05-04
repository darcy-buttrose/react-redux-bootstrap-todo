/// <reference path="../typings/browser.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp.react';

import '../css/base.css';
import '../css/app.css';

class Dummy extends React.Component<{}, {}> { }

ReactDOM.render(
    <TodoApp />,
    document.getElementById('content')
);
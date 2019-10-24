import * as ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";
import GameContainer from "../containers/GameContainer";
import MainPageContainer from "../containers/MainPageContainer";
import Error from "../components/Error";

export default class MainRoute extends React.Component {

    // eslint-disable-next-line no-unused-vars
    componentDidCatch(err, errInfo) {
        ReactDOM.render(<Error/>, document.getElementById('root'));
    }

    render() {
        return (<BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login">
                        <LoginContainer/>
                    </Route>
                    <Route path="/register">
                        <RegisterContainer/>
                    </Route>
                    <Route path="/game">
                        <GameContainer/>
                    </Route>
                    <Route path="/">
                        <MainPageContainer/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>)
    }
}
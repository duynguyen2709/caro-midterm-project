import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginContainer from "../containers/forms/LoginContainer";
import RegisterContainer from "../containers/forms/RegisterContainer";
import GameContainer from "../containers/game/GameContainer";
import MainPageContainer from "../containers/forms/MainPageContainer";

export default function MainRoute() {
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
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginContainer from "../containers/forms/LoginContainer";
import RegisterContainer from "../containers/forms/RegisterContainer";
import OfflineGameContainer from "../containers/game/OfflineGameContainer";
import OnlineGameContainer from "../containers/game/OnlineGameContainer";
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
                <Route path="/onlinegame">
                    <OnlineGameContainer/>
                </Route>
                <Route path="/offlinegame">
                    <OfflineGameContainer/>
                </Route>
                <Route path="/">
                    <MainPageContainer/>
                </Route>
            </Switch>
        </div>
    </BrowserRouter>)
}
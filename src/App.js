import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Main from "./pages/main/pages/Main";

import { useAuth } from "./shared/hooks/auth-hook";

function App() {
    const { token, logout, login, userId } = useAuth()


    return (
        <Router>
            <MainNavigation />
            <Switch>
                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/userinfo" exact>
                    Userinfo
                </Route>
                <Route path="/add-week-journal">
                    Add week jornal
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Router>
    );
}

export default App;

import logo from './logo.svg';
import './App.css';

import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
    useHistory
} from 'react-router-dom';

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Main from "./pages/main/pages/Main";
import Login from "./pages/user/pages/Login";
import SetUp from "./pages/user/pages/SetUp";

import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import {useContext} from "react";
import AddJornal from "./pages/add-jornal/pages/AddJornal";

function App() {
    const { token, logout, login, userId } = useAuth()
    const auth = useContext(AuthContext)

    let routes

    if (!!token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/setup" exact>
                    <SetUp />
                </Route>
                <Route path="/add-journal/:yearNum/:quarter/:weekNum/:jid/:mode" exact>
                    <AddJornal />
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Redirect to="/login"/>
            </Switch>
        )
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout
        }}>
            <Router basename={process.env.PUBLIC_URL}>
                <MainNavigation />
                { routes }
            </Router>
        </AuthContext.Provider>

    );
}

export default App;

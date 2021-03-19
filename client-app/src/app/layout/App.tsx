import React, {useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./navbar";
import {observer} from "mobx-react-lite";
import {Route, useLocation, Switch} from 'react-router-dom';
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import {ToastContainer} from "react-toastify";
import LoginForm from "../../features/users/LoginForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import {useStore} from "../stores/store";
import LoadingComponent from "./loadingComponent";
import ModalContainer from "../common/Modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

function App() {
    const location = useLocation();
    const {commonsStore, userStore} = useStore();

    useEffect(() => {
        if (commonsStore.token) {
            userStore.getUser().finally(() => commonsStore.setAppLoaded());
        } else {
            commonsStore.setAppLoaded();
        }
    }, [commonsStore, userStore])

    if (!commonsStore.appLoaded) return <LoadingComponent content='Loading app...'/>

    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar/>
            <ModalContainer/>
            <Route exact path='/' component={HomePage}/>
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <div className="header">
                            <NavBar/>
                        </div>
                        <Container style={{marginTop: '2em', marginBottom: '2em'}}>
                            <Switch>
                                <Route exact path='/activities' component={ActivityDashboard}/>
                                <Route path='/activities/:id' component={ActivityDetails}/>
                                <Route key={location.key} path={['/createActivity', '/manage/:id']}
                                       component={ActivityForm}/>
                                <Route path='/profiles/:username' component={ProfilePage}/>
                                <Route path='/errors' component={TestErrors}/>
                                <Route path='/server-error' component={ServerError}/>
                                <Route path='/login' component={LoginForm}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Container>
                        <div className="footer">
                            <h4>2021 © Reactivities by Mos</h4>
                        </div>
                    </>
                )}
            />

        </>
    );
}

export default observer(App);

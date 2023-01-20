import React from 'react';
import { Switch } from 'react-router-dom';
import RouteHandler from './components/RouteHandler';

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import MyAccount from './pages/MyAccount';

export default () => {
    return (
        <Switch>
            <RouteHandler exact path="/">
                <Home />
            </RouteHandler>
            <RouteHandler path="/about">
                <About />    
            </RouteHandler> 
            <RouteHandler path="/SignIn">
                <SignIn />
            </RouteHandler>
            <RouteHandler path="/SignUp" >
                <SignUp />
            </RouteHandler>
            <RouteHandler path="/ad/:id">
                <AdPage />
            </RouteHandler> 
            <RouteHandler path="/ads">
                <Ads />
            </RouteHandler> 
            <RouteHandler private path="/post-an-ad">
                <AddAd />
            </RouteHandler>
            <RouteHandler private path="/myaccount">
                <MyAccount />
            </RouteHandler>
            <RouteHandler path="*" >
                <NotFound />
            </RouteHandler>
        </Switch>
    );

}
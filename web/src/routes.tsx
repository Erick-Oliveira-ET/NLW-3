import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanageMap';

function Routes() {
    //The switch is used to allow just one route at a time to be accessed
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} /> 
                <Route path="/OrphanageMap" component={OrphanageMap} />

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
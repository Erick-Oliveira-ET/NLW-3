import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../pages/Landing';
import OrphanageMap from '../pages/OrphanageMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import CreatedOrphanage from '../pages/CreatedOrphanage';
import Login from '../pages/Login';

const AppRoutes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Landing} /> 
        <Route path="/app" component={OrphanageMap} />
        
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/created" component={CreatedOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />

        <Route path="/login" component={Login} />

    </Switch>
)

export default AppRoutes;
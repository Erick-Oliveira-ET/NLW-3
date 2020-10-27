import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import NewPassword from '../pages/NewPassword';
import NewPasswordVerifiedEmail from '../pages/NewPasswordVerifiedEmail';

import { useAuth }from '../context/auth';
import Dashboard from '../pages/Dashboard';
import Edit from '../pages/Edit';
import Status from '../pages/Status';
import DeletedOrphanage from '../pages/DeletedOrphanage';

const AuthRoutes: React.FC = () => {
    const {signed} = useAuth();

    const history = useHistory();

    if(signed){
        return(
            <Switch>
                <Route path="/newpassword" component={NewPassword} />
                <Route path="/newpasswordverifiedemail" 
                    component={NewPasswordVerifiedEmail} 
                />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/status/:id" component={Status} />
                <Route path="/delete" component={DeletedOrphanage} />
            </Switch>)
        
    } else{
        history.push('/login');

        return <></>
    

    }
    

}

export default AuthRoutes;
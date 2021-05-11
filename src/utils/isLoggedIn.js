import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const IsLoggedIn = ({ user, loggedInPath, children, ...rest }) => {
    return (
            <Route
                {...rest}
                render={() => {
                    if (!user) {
                        return children;
                    }
                    
                    if (user) {
                        return ( <Redirect to={{ pathname: loggedInPath }} /> );
                    }
                    
                    return null;
                }}
            />
    )
}

export default IsLoggedIn;
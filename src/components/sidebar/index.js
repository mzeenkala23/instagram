import React from 'react';

import useUser from '../../hooks/useUser';
import Suggestions from './suggestions';
import User from './user';

export default function Sidebar() {
    const { user: { userId, username, fullName } = {} } = useUser();

    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} />
        </div>
    );
}
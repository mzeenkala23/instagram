import React from 'react';

import { Link } from 'react-router-dom';

const Header =({username}) => {
    return (
        <div className="flex border-b h-4 p-4 py-8">
        <div className="flex items-center">        
            <Link to={`/p/${username}`} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold">{username}</p>
            </Link>
        </div>
    </div>
    )
}

export default Header;
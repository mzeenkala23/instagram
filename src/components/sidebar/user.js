import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const User = ({ username, fullName }) => {
    return (
        !username || !fullName ? (
            <Skeleton count={1} height={61} />        
        ) : (
            <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-4 items-center">
                <div className="flex items-center justify-between col-span-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="rounded-full w-16 flex mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="col-span-3">
                    <p className="font-bold text-sm">{username}</p>
                    <p className="text-sm">{fullName}</p>
                </div>
            </Link>
        )
    )
}
    
export default User;
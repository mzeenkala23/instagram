import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {getUserByUserId, updateUserFollowing, updateFollowedUserFollowers } from '../../utils/firebase';

const Suggestedprofile = ({ userDocId, username, profileId, userId }) => {
    const [followed, setFollowed] = useState(false);
    
    async function handleFollowUser() {
        setFollowed(true);

         
        const [{ docId }] = await getUserByUserId(userId);
        await updateUserFollowing(docId, profileId);
        await updateFollowedUserFollowers(userDocId, userId);
    }
    
    return (
        !followed ? (
            <div className="flex flex-row items-center align-items justify-between">
                <div className="flex items-center justify-between">
                    <svg xmlns="http://www.w3.org/2000/svg" className="rounded-full w-8 flex mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <Link to={`/p/${username}`}>
                        <p className="font-bold text-sm">{username}</p>
                    </Link>
                </div>
                <div className="flex">
                    <button
                        className="text-sm font-bold text-blue"
                        type="button"
                        onClick={handleFollowUser}
                    >
                        Follow
                    </button>
                </div>
            </div>
        ) : null
    )
}

export default Suggestedprofile;
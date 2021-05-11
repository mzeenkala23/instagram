import { Firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await Firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        
    return result.docs.map((user) => user.data().length > 0);
}


export async function getUserByUserId(userId) {
    const result = await Firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();
        
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return user;
}

export async function getUserFollowedPhotos(userId, followingUserIds) {
    const result = await Firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', followingUserIds)
        .get();
        
    const userFollowedPhotos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    const photoWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const username = user[0].username;
            return {username, ...photo, userLikedPhoto}
        })
    )
    return photoWithUserDetails;
}


export async function getSuggestedProfiles(userId) {
    const result = await Firebase.firestore().collection('users').limit(10).get();
    const [{ following }] = await getUserByUserId(userId);
        
    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}


export async function updateUserFollowing(docId, profileId, isFollowingProfile) {
    return Firebase
        .firestore()
        .collection('users')
        .doc(docId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(docId, followingUserId, isFollowingProfile) {
    return Firebase
        .firestore()
        .collection('users')
        .doc(docId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(followingUserId)
                : FieldValue.arrayUnion(followingUserId)
        });
}

export async function getUserByUsername(username) {
    const result = await Firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
 
    return user.length > 0 ? user : false;  
}

export async function getUserIdByUsername(username) {
    const result = await Firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        
    const [{ userId = null }] = result.docs.map((item) => ({
        ...item.data(),
    }));

    return userId;
}



export async function getUserPhotosByUsername(username) {
    const userId = await getUserIdByUsername(username);
    const result = await Firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get();
        
    const photos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return photos;
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileId, followingUserId
) {
    await updateUserFollowing(activeUserDocId, profileId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}

export async function isUserFollowingProfile(activeUsername, profileUserId) {
    const result = await Firebase
        .firestore()
        .collection('users')
        .where('username', '==', activeUsername)
        .where('following', 'array-contains', profileUserId)
        .get();
        
    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return !!response.fullName;
}
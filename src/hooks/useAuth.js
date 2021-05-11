import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuth() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { Firebase } = useContext(FirebaseContext);
    
    useEffect(() => {
        const listener = Firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
        return () => listener();
    }, [Firebase]);
    
    return { user };
}
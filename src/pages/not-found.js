import React, { useEffect } from 'react';
import Header from '../components/Header';

const NotFound =() => {
    useEffect(() => {
        document.title = '404 - Not Found';
    });
    
    return (
        <div className="bg-gray">
             <Header />
            <div className="mx-auto max-w-screen-lg">
                <p className="text-center text-2xl">Not Found!</p>
            </div>
        </div>
    )
}
export default NotFound;
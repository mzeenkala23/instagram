import React, { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';



const AddComment = ({ docId, comments, setComments, commentInput }) => {
    const [comment, setComment] = useState('');
    const { Firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName } } = useContext(UserContext);
    
    const handleSubmitComment = (event) => {
        event.preventDefault();
        
        setComments([{ displayName, comment }, ...comments ]);
        setComment('');
        
        return Firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    }
    
    return (
        <div className="border-t border-gray">
            <form
                className="flex w-full justify-between pl-0 pr-5"
                onSubmit={(event) =>
                    comment.length >= 3 ? handleSubmitComment(event) : event.preventDefault()
                }
                method="POST"
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button 
                    className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 3}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default AddComment;
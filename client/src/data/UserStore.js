import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';

// Acting as a call to the backend or some middleware.
import {
  getUser,
  getUserPosts,
  getPosts,
  getLists
} from './MockDataProvider';

// No sure where this id will be coming from yet, but it's
// time to start passing in more realistic user data.
const id = '5e7216fbacd4a42955b6450e';

// This represents posts which are relevant to the authenticated user.
// They contain both there posts and other users, I'm not sure of how
// the logic works for decided what is considered relevant.
const posts = getPosts();

const lists = getLists();

// Allows for activating any given form.
const activeForm = null;

const postFormOpen = false;

const user = getUser(id);
const initialState = {
  ...userConfig,
  user,
  lists,
  posts,
  postFormOpen,
  activeForm
};

function reducer(state, action) {
  switch (action.type) {
    case 'editPost':
      return { ...state, postFormOpen: true, activeForm: action.payload };
    case 'addCommentToPost':
      return { ...state, commentFormOpen: true, activeForm: action.payload };
    case 'CommentFormSave':
      // Prints to the console, the submitted post data.
      console.log(action.payload);
    return { ...state };
    case 'CommentFormClose':
      // Prints to the console, the submitted post data.
      return { ...state, commentFormOpen: false, activeForm: null };
    return { ...state };
    case 'PostFormSave':
      // Prints to the console, the submitted post data.
      console.log(action.payload);
    return { ...state };
    // The next two case may be moved to a local state.
    case 'PostFormOpen':
      return { ...state, postFormOpen: true, activeForm: action.payload };
    case 'PostFormClose':
      return { ...state, postFormOpen: false, activeForm: null };
    // Need to add logic for these actions.  It's unclear
    // how it will be implemented.
    case 'likePost':
      console.log(`liked postId: ${action.payload}`);
      return { ...state };
    case 'dislikePost':
      console.log(`disliked postId: ${action.payload}`);
      return { ...state };
    case 'newFriendRequest':
      
      console.log(`userId ${action.payload.userId} want to be friends with userId ${action.payload.friendId}`);
      return { ...state };
    case 'reportPost':
      console.log(`postId ${action.payload} has been reported`);
      return { ...state };
    case 'changeActiveHeaderTab':
      return { ...state, activeHeaderTab: action.payload };
    default:
      throw new Error('Action type is not defined.');
  }
}

export const UserContext = createContext({});

export const UserStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

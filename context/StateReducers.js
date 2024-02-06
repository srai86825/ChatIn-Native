import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  isNewUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  unreadMessages: [],
  socket: undefined,
  messageSearchApplied: false,
  onlineUsers: [],
  filteredContactUsers: [],
  incomingVoiceCall: undefined,
  voiceCall: undefined,
  incomingVideoCall: undefined,
  videoCall: undefined,
  allUserStories: undefined,
  fetchedFeed: undefined,
  attemptedFeed: {
    icebreakers: false,
    wouldYouRather: false,
  },
  allContactsConnected: undefined,
  fullScreenMode:false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_STATE: {
      return action.state;
    }

    case reducerCases.SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_NEW_USER: {
      return {
        ...state,
        isNewUser: action.isNewUser,
      };
    }
    case reducerCases.SET_ALL_CONTACTS: {
      return {
        ...state,
        contactsPage: !state.contactsPage,
      };
    }

    case reducerCases.CHANGE_CURRENT_CHAT_USER: {
      return {
        ...state,
        currentChatUser: action.user,
      };
    }

    case reducerCases.SET_MESSAGES: {
      return {
        ...state,
        messages: action.messages,
      };
    }
    case reducerCases.SET_UNREAD_MESSAGES: {
      return {
        ...state,
        unreadMessages: action.unreadMessages,
      };
    }
    case reducerCases.SET_SOCKET: {
      return {
        ...state,
        socket: action.socket,
      };
    }

    case reducerCases.ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
        unreadMessages: [...state.unreadMessages, action.newMessage],
      };
    }

    case reducerCases.MESSAGE_SEARCH_APPLIED: {
      return {
        ...state,
        messageSearchApplied: !state.messageSearchApplied,
      };
    }

    case reducerCases.SET_ONLINE_USERS: {
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    }

    case reducerCases.SET_SEARCH_CONTACT_USERS: {
      return {
        ...state,
        filteredContactUsers: state.contactUsers.filter((c) =>
          c.data.name.toLowerCase().includes(action.filterQuery.toLowerCase())
        ),
      };
    }

    case reducerCases.SET_INCOMING_VIDEO_CALL: {
      return {
        ...state,
        incomingVideoCall: action.incomingVideoCall,
      };
    }
    case reducerCases.SET_VIDEO_CALL: {
      return {
        ...state,
        videoCall: action.videoCall,
      };
    }
    case reducerCases.SET_INCOMING_VOICE_CALL: {
      return {
        ...state,
        incomingVoiceCall: action.incomingVoiceCall,
      };
    }
    case reducerCases.SET_VOICE_CALL: {
      return {
        ...state,
        voiceCall: action.voiceCall,
      };
    }

    case reducerCases.SET_END_CALL: {
      return {
        ...state,
        incomingVoiceCall: undefined,
        voiceCall: undefined,
        incomingVideoCall: undefined,
        videoCall: undefined,
      };
    }

    case reducerCases.SET_ALL_USERS_STORIES: {
      return {
        ...state,
        allUserStories: action.allUserStories,
      };
    }

    case reducerCases.SET_FETCHED_FEED: {
      return {
        ...state,
        fetchedFeed: action.fetchedFeed,
      };
    }

    case reducerCases.SET_ATTEMPTED_FEED: {
      return { ...state, attemptedFeed: action.attemptedFeed };
    }

    case reducerCases.SET_ALL_CONTACTS_CONNECTED: {
      return {
        ...state,
        allContactsConnected: action.allContactsConnected,
      };
    }

    case reducerCases.SET_FULLSCREEN_MODE:{
      return {
        ...state,
        fullScreenMode: action.fullScreenMode
      }
    }

    default:
      return state;
  }
};

export default reducer;

import { createContext, useReducer } from 'react';
import { AuthReducer } from './AuthReducer';

const INTIAL_STATE = {
  user: {
    _id: '640405772283adc0cb841860',
    username: 'M_Cohen',
    email: 'miranda-cohen@test.com',
    profilePicture:
      'https://i0.wp.com/www.wikiblogon.in/wp-content/uploads/2022/12/7t2H4ziuU84M2D1u-_IaF1uaUDjKr0dHbr9aoo83TRcVTNtPIt99mJLu9gCPddpVgD5tqPTvZAs900-c-k-c0x00ffffff-no-rj.jpg',
    coverPicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzOnvnoFHlv1V4DHmyDW_56uyuA1spfYVqlQ&usqp=CAU',
    followers: ['6400135ff296042274225df1', '6405861f808587960029d801'],
    followings: ['6405861f808587960029d801'],
    isAdmin: false,
    createdAt: '2023-03-05T02:59:03.699Z',
    desc: 'Angel from Heaven',
    city: 'Tampa',
    from: 'USA',
    relationship: 1,
  },
};

export const AuthContext = createContext(INTIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INTIAL_STATE);

  const value = {
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

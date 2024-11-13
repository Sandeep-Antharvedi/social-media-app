import { LOGIN_ACTION_TYPES } from '../action-types';

export const LoginStart = (userCredentials) => {
  return {
    type: LOGIN_ACTION_TYPES.LOGIN_START,
  };
};

export const LoginSuccess = (user) => {
  return {
    type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS,
    payload: user,
  };
};
export const LoginFailure = (error) => {
  return {
    type: LOGIN_ACTION_TYPES.LOGIN_FAILURE,
    payload: error,
  };
};

export const FollowStart = (userId) => {
  return {
    type: 'FOLLOW_START',
  };
};

export const FollowSuccess = (userId) => {
  return {
    type: 'FOLLOW_START',
    payload: userId,
  };
};

export const FollowFailure = (error) => {
  return {
    type: 'UNFOLLOW_START',
    payload: error,
  };
};

export const UnfollowStart = (userId) => {
  return {
    type: 'FOLLOW_START',
  };
};

export const UnollowSuccess = (userId) => {
  return {
    type: 'UNFOLLOW_START',
    payload: userId,
  };
};

export const UnollowFailure = (error) => {
  return {
    type: 'UNFOLLOW_START',
    payload: error,
  };
};

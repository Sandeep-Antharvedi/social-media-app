import axios from 'axios';
import { LOGIN_ACTION_TYPES } from '../context';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: LOGIN_ACTION_TYPES.LOGIN_START });
  try {
    const { data } = await axios.post('/api/auth/login', userCredential);
    dispatch({
      type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: LOGIN_ACTION_TYPES.LOGIN_FAILURE, payload: error });
  }
};

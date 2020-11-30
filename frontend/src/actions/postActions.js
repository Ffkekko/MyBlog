import Axios from 'axios';
import { POST_COMMENT_SAVE_FAIL, POST_COMMENT_SAVE_REQUEST, POST_COMMENT_SAVE_SUCCESS, POST_CREATE_FAIL, POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_DELETE_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DETAILS_FAIL, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_UPDATE_FAIL, POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS } from '../constants/postConstants';


export const listPosts = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const { data } = await Axios.get(`/api/posts?keyword=${keyword}`);
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST, payload: post });

    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();

    const { data } = await Axios.put(`/api/posts/${post._id}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsPost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST, payload: postId });
    const { data } = await Axios.get(`/api/posts/${postId}`);
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (postId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: POST_DELETE_REQUEST, payload: postId });
    const { data } = await Axios.delete(`/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: POST_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: POST_CREATE_REQUEST });
    const { data } = await Axios.post(
      '/api/posts',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data.post,
      success: true,
    });

  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updatePostComment = (postId, comment) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: POST_COMMENT_SAVE_REQUEST, payload: comment });
    const { data } = await Axios.post(
      `/api/posts/${postId}/comments`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: POST_COMMENT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({
      type: POST_COMMENT_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


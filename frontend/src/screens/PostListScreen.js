/* eslint-disable react/jsx-indent */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-curly-newline */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  listPosts,
  deletePost,
  createPost,
} from '../actions/postActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  POST_CREATE_RESET,
  POST_DETAILS_RESET,
} from '../constants/postConstants';

function PostListScreen(props) {
 

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const postList = useSelector((state) => state.postList);
  const { loading, posts, error } = postList;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    success: successCreate,
    error: errorCreate,
    post: createdPost,
  } = postCreate;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: successDelete } = postDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
      props.history.push(`/post/${createdPost._id}/edit`);
    }
    dispatch(listPosts());
    dispatch({ type: POST_DETAILS_RESET });
    return () => {
      //
    };
  }, [
    successDelete,
    successCreate,
    dispatch,
    props.history,
    createdPost,
    userInfo,
  ]);

  const deleteHandler = (post) => {
    if (window.confirm('Are you sure to delete this post?')) {
      dispatch(deletePost(post._id));
    }
  };

  const createHandler = () => {
    dispatch(createPost());
  };
  return (
    <div>
      <div className="row">
        <h1>Posts</h1>
        
        {/* {userInfo && userInfo.isAdmin && (  */}
          <button type="button" className="primary" onClick={createHandler}>
            Create Post
          </button>
       {/*  )
        } */}
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : posts.length === 0 ? (
        <MessageBox variant="info">No Order Found</MessageBox>
      ) : (
        <>
          {errorCreate && (
            <MessageBox variant="error">{errorCreate}</MessageBox>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                {/* <th>WRITTEN BY</th> */}
                <th>CREATED AT</th>
                <th>UPDATED AT</th>
                <th>ACTIONS</th>
                
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post._id}</td>
                  <td>{post.title}</td>
                  {/* <td>{post.writer.name}</td> */}
                  <td>{post.createdAt.substring(0, 10)}</td>
                  <td>{post.updatedAt.substring(0, 10)}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/post/${post._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
export default PostListScreen;

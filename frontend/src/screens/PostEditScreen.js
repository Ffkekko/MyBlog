/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { POST_UPDATE_RESET } from '../constants/postConstants';
import { detailsPost, updatePost } from '../actions/postActions';
import RichTextEditor from '../components/RichTextEditor';
/* import Editor1 from '../components/Editor1'; */
/* import MyEditor from '../components/MyEditor'; */

function PostEditScreen(props) {
  const postId = props.match.params.id;
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  /* const [ paragraph, setParagraph] = useState(''); */
  const [uploading, setUploading] = useState(false);

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = postUpdate;

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, post, error } = postDetails;

  let paragraph=post.paragraph;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
      props.history.push(`/postlist`);
    }
    if (!post.title) {
      dispatch(detailsPost(postId));
    } else {
      setId(post._id);
      setTitle(post.title);
      setImage(post.image);
      setImages(post.images);
      /* setParagraph(post.paragraph); */
    }

    return () => {
      //
    };
  }, [post, successUpdate, dispatch, props.history, postId]);
  const uploadFileHandler = (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (forImages) {
          setImages([...images, response.data]);
        } else {
          setImage(response.data);
        }
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        _id: id,
        title,
        image,
        images,
        paragraph/* : JSON.stringify(paragraph) */,
      })
    );
  };

    /* FUNCTION TO MAKE INPUT IN EDIT PRODUCT IN CAPITAL LETTER FIRST LETTERSO THAT CATEGORIES ARE FOUND IN HAMBURGER */
    function capitalizeFirstLetter(x) {
      return x.charAt(0).toUpperCase() + x.slice(1)
    };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Post {id}</h1>
        </div>

        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="error">{errorUpdate}</MessageBox>}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="error">{error}</MessageBox>}
        {post.title && (
          <>
            <div>
              <label htmlFor="name">Title</label>
              <input
                id="name"
                type="text"
                placeholder="Enter title"
                value={capitalizeFirstLetter(title)}  /* it was {name} */   /* REMEMBER: capital letter on set doesn't work so make sure that name and brand are only one word, this way it works. Otherwise, make sure that words are re-written */
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          
            <div>
              <label htmlFor="image">Image Url</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image-file">Image File</label>
              <input
                type="file"
                id="image-file"
                label="Choose Image"
                onChange={uploadFileHandler}
              />

              {uploading && <LoadingBox />}
            </div>
            <div>
              <label htmlFor="image-file">Additional Images</label>
              <div>
                <ul>
                  {images.length === 0 && <li>No image</li>}
                  {images.map((x) => (
                    <li>{x}</li>
                  ))}
                </ul>
                <input
                  type="file"
                  id="additional-image-file"
                  label="Choose Image"
                  onChange={(e) => uploadFileHandler(e, true)}
                />
              </div>
              {uploading && <LoadingBox />}
            </div>
            

            <div>
              {/* <label htmlFor="paragraph">Paragraph</label> */}
              {/* <textarea
                id="paragraph"
                rows="6"
                placeholder="Enter paragraph"
                value={capitalizeFirstLetter(paragraph)}
                onChange={(e) => setParagraph(e.target.value)}
              /> */}
            </div>
            <div>
              <label htmlFor="paragraph">Paragraph</label>
              <RichTextEditor id="paragraph" paragraph={paragraph} />
              {/* <Editor1 /> */}
              {/* <MyEditor /> */}
            </div>
            <div>
              <div />
              <div>
                <button
                  onClick={() => props.history.push('/postlist')}
                  type="button"
                >
                  Back
                </button>{' '}
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default PostEditScreen;

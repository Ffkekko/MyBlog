import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
/* import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'; */
import { listPosts } from '../actions/postActions';
import Post from '../components/Post';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function HomeScreen() {
  const postList = useSelector((state) => state.postList);
  const { posts, loading, error } = postList;
  const [keyword, setKeyword] = useState('');

  const filteredPosts = posts.filter(
    post =>
      post.title.toLocaleLowerCase().includes(keyword) ||
      post.paragraph.toLocaleLowerCase().includes(keyword)
  );

  const postsToDisplay = keyword ? filteredPosts : posts;

  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(listPosts());
    return () => {
      //
    };
  }, [dispatch,]);


  return (
    <div>

      <ul className="filter">
        <li>
          <form>
            <input name="Keyword" placeholder="Search..." onChange={(e) => setKeyword(e.target.value)} />
          </form>
        </li>
        
      </ul>

      <h2>Featured Posts</h2>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <>
          {filteredPosts.length === 0 && <MessageBox>No Post Found</MessageBox>}
          <div className="row center">
            {postsToDisplay.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default HomeScreen;

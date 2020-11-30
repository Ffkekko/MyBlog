/* eslint-disable react/jsx-indent */
import React from 'react';
import { Link } from 'react-router-dom';
/* import Rating from './Rating'; */

export default function Post(props) {
  const { post } = props;
  return (
    <div className="card">
      <Link to={`/post/${post._id}`}>
        <img className="medium" src={post.image} alt={post.name} />
      </Link>
      <div className="card-body">
        <ul>
          <li>
            <Link to={`/post/${post._id}`}>
              <h2 className="home-title">{post.title}</h2>
            </Link>
          </li>

          
          <li className="home-paragraph">{post.paragraph}</li>
          
        </ul>

        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}

      {/*   <div className="row">
          <div className="price">€{post.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

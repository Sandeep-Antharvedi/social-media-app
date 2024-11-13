import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MoreVert } from '@mui/icons-material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context';
import './Post.css';

const Post = ({ post }) => {
  const [like, setlike] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null);

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users?userId=${post.userId}`);
      setUser(data);
    };
    fetchUser();
  }, [post.userId]);

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser, post]);

  const likeHandler = () => {
    try {
      axios.put(`/api/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setlike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/profile/${user?.username}`} className="link">
              <img
                src={
                  user?.profilePicture ||
                  `${publicFolder}person/blank-profile.png`
                }
                alt=""
                className="post-profile-image"
              />
            </Link>
            <span className="post-username">{user?.username}</span>
            <span className="post-date">{moment().from(post?.createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          {post?.desc && <span className="post-text">{post.desc}</span>}
          {post?.img && (
            <img
              src={
                post?.img.includes('http') ? post.img : publicFolder + post.img
              }
              alt=""
              className="post-image"
            />
          )}
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <img
              className="like-icon"
              src={`${publicFolder}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="like-icon"
              src={`${publicFolder}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="post-like-counter">{like} people like it</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{post?.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

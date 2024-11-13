import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Feed.css';
import { Share, Post } from '../';
import { AuthContext } from '../../context';

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = username
          ? await axios.get(`/api/posts/profile/${username}`)
          : await axios.get(`/api/posts/timeline/${user._id}`);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [username, user]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {username === user.username && <Share />}
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Feed;

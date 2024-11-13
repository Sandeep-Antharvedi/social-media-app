import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Topbar, Sidebar, Feed, Rightbar } from '../../components';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users?username=${username}`);
      setUser(data);
    };
    fetchUser();
  }, [username]);

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Topbar />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                src={
                  user?.coverPicture || `${publicFolder}person/blank-cover.jpeg`
                }
                alt=""
                className="profile-cover-image"
              />
              <img
                src={
                  user?.profilePicture ||
                  `${publicFolder}person/blank-profile.png`
                }
                alt=""
                className="profile-user-image"
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">{user?.username}</h4>
              <span className="profile-info-desc">{user?.desc}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { AuthContext } from '../../context';
import './Topbar.css';

const Topbar = () => {
  const { user } = useContext(AuthContext);

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" className="link">
          <span className="logo">SOCIAL</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for friend, post, or video"
          />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-links">
          <Link to="/" className="link">
            <span className="topbar-link">Home</span>
          </Link>
          <Link to="/" className="link">
            <span className="topbar-link">Timeline</span>
          </Link>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item">
            <Person />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Chat />
            <span className="topbar-icon-badge">2</span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user?.profilePicture || `${publicFolder}person/blank-profile.png`
            }
            alt=""
            className="topbar-image"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;

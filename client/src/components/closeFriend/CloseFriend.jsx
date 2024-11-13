import './CloseFriend.css';

const closeFriend = ({ user }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="close-friend-list-item">
      <img
        src={publicFolder + user.profilePicture}
        alt=""
        className="close-friend-image"
      />
      <span className="close-friend-name">{user.username}</span>
    </li>
  );
};

export default closeFriend;

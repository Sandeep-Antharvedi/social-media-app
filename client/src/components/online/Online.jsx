import './Online.css';
const Online = ({ user }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="online-friend">
      <div className="online-profile-image-container">
        <img
          src={publicFolder + user.profilePicture}
          alt=""
          className="online-profile-image"
        />
        <span className="online-circle"></span>
      </div>
      <span className="online-username">{user.username}</span>
    </li>
  );
};

export default Online;

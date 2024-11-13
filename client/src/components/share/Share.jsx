import { useState, useContext, useRef } from 'react';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../../context';
import './Share.css';

const Share = () => {
  const [file, setFile] = useState(null);

  const { user } = useContext(AuthContext);

  const descRef = useRef();

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const habdleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;

      try {
        await axios.post('/api/upload', data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post('/api/posts', newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            className="share-profile-image"
            src={
              user?.profilePicture || `${publicFolder}person/blank-profile.png`
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="share-input"
            ref={descRef}
          />
        </div>
        <hr className="share-hr" />
        <form className="share-bottom" onSubmit={habdleSubmit}>
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia htmlColor="tomato" className="share-option-icon" />
              <span className="share-option-text">Photo or Vedio</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.gif"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
            </label>

            <div className="share-option">
              <Label htmlColor="blue" className="share-option-icon" />
              <span className="share-option-text">Tag</span>
            </div>

            <div className="share-option">
              <Room htmlColor="green" className="share-option-icon" />
              <span className="share-option-text">Location</span>
            </div>

            <div className="share-option">
              <EmojiEmotions
                htmlColor="goldenrod"
                className="share-option-icon"
              />
              <span className="share-option-text">Feelings</span>
            </div>
          </div>
          <button type="submit" className="share-button">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;

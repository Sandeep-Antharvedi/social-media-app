import { Topbar, Sidebar, Feed, Rightbar } from '../../components';
import './Home.css';
const Home = () => {
  return (
    <>
      <Topbar />
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;

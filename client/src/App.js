// import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import UserProfile from './pages/UserProfile'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/viewuser/:userId" element={<UserProfile />} />
        </Routes>
    </>
  );
}

export default App;

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import UserProfile from './pages/UserProfile'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/viewuser/:userId" element={<UserProfile />} />
        </Routes>
    </>
  );
}

export default App;

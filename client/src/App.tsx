import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Layout from './components/Layout';
import Home from './pages/Home';
import SessionDetails from './pages/SessionDetails';
import About from './pages/About';
import Profile from './pages/Profile';
import Stats from './pages/Stats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sign In - no layout */}
        <Route path="/" element={<SignIn />} />
        
        {/* Protected pages - with layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sessions/:sessionId" element={<SessionDetails />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
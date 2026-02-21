import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Layout from './components/Layout';
import Home from './pages/Home';
import SessionDetails from './pages/SessionDetails';

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
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
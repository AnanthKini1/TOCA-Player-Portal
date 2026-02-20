import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sign In - no layout */}
        <Route path="/" element={<SignIn />} />
        
        {/* Protected pages - with layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
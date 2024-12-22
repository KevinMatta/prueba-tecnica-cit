import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar';
import './App.css'
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import DetailsPage from './pages/DetailsPage';

function App() {

  return (
    <Router>
      <div>
        {/* Navbar */}
        <header>
            <NavBar/>
        </header>

        {/* Contenido */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

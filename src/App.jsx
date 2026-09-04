import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import HomePage from './pages/HomePage';
import PostHarvestPage from './pages/PostHarvestPage';
import FindProducePage from './pages/FindProducePage';
import ListingsPage from './pages/ListingsPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

/**
 * GoviLink Base Application Shell
 * Configures global React Router routes and shared layout foundation
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="page-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post-harvest" element={<PostHarvestPage />} />
            <Route path="/find-produce" element={<FindProducePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

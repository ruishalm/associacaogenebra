import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:slug" element={<NewsArticlePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

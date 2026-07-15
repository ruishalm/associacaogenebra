import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import ServicesPage from './pages/ServicesPage';
import AdminLoginPage from './pages/AdminLoginPage';
import NewPostPage from './pages/admin/NewPostPage';
import EditPostPage from './pages/admin/EditPostPage';
import NewGalleryItemPage from './pages/NewGalleryItemPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:slug" element={<NewsArticlePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/postar-noticia" element={<NewPostPage />} />
          <Route path="/admin/editar-noticia/:slug" element={<EditPostPage />} />
          <Route path="/admin/postar-foto" element={<NewGalleryItemPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
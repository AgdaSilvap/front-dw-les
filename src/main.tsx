import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './pages/Layout.tsx'
import './styles/styles.css'
import { BrowserRouter } from "react-router";
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home.tsx';
import { AutorRegister } from './pages/AutorRegister.tsx';
import { PublisherRegister } from './pages/PublisherRegister.tsx';
import { FeedbackPage } from './pages/FeedbackPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="autor-register" element={<AutorRegister />} />
          <Route path="publisher-register" element={<PublisherRegister />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>

      </Routes>

    </BrowserRouter>
  </StrictMode>,
)

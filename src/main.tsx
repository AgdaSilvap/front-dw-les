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
import { LivroRegister } from './pages/LivroRegister.tsx';
import { SalaRegister } from './pages/SalaRegister.tsx';
import { ReservaRegister } from './pages/ReservaRegister.tsx';
import { SalasRefrigeradas } from './pages/RelSalasRefrigeradas.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="autor-register" element={<AutorRegister />} />
          <Route path="publisher-register" element={<PublisherRegister />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="livro-register" element={<LivroRegister />} />
          <Route path="sala-register" element={<SalaRegister />} />
          <Route path="reserva-register" element={<ReservaRegister />} />
          <Route path="salas-refrigeradas" element={<SalasRefrigeradas />} />
        </Route>

      </Routes>

    </BrowserRouter>
  </StrictMode>,
)

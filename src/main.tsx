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
import { ClienteRegister } from './pages/ClienteRegister.tsx';
import { FuncionarioRegister } from './pages/FuncionarioRegister.tsx';
import { AluguelPage } from './pages/AluguelPage.tsx';
import { RelatorioAluguelPorClientePage } from './pages/AluguelPorClientePage.tsx';
import { RelatorioAluguelPorAutorPage } from './pages/AluguelPorAutorPage.tsx';
import { LivroRegister } from './pages/LivroRegister.tsx';
import { SalaRegister } from './pages/SalaRegister.tsx';
import { ReservaRegister } from './pages/ReservaRegister.tsx';
import { SalasRefrigeradas } from './pages/RelSalasRefrigeradas.tsx';
import { ListPublisherByAutor } from './pages/ListPublisherByAutor.tsx';
import { ListFeedbacksPeriod } from './pages/ListFeedbacksPeriod.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="autor-register" element={<AutorRegister />} />
          <Route path="cliente-register" element={<ClienteRegister />} />
          <Route path="funcionario-register" element={<FuncionarioRegister />} />
          <Route path="publisher-register" element={<PublisherRegister />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="aluguel" element={<AluguelPage />} />
          <Route path="aluguel-cliente" element={<RelatorioAluguelPorClientePage />} />
          <Route path="aluguel-autor" element={<RelatorioAluguelPorAutorPage />} />
          <Route path="livro-register" element={<LivroRegister />} />
          <Route path="sala-register" element={<SalaRegister />} />
          <Route path="reserva-register" element={<ReservaRegister />} />
          <Route path="salas-refrigeradas" element={<SalasRefrigeradas />} />
          <Route path="editora-por-autor" element={<ListPublisherByAutor />} />
          <Route path="list-feedbacks" element={<ListFeedbacksPeriod />} />
        </Route>

      </Routes>

    </BrowserRouter>
  </StrictMode>,
)

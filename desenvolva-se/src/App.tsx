import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cabecalho from './components/Cabecalho'; 
// Ajuste os caminhos das páginas para 'src/components/'
import Home from './components/Home';      // <--- ATUALIZADO
import Cursos from './components/Cursos';  // <--- ATUALIZADO
import Sobre from './components/Sobre';    // <--- ATUALIZADO
import Contato from './components/Contato';// <--- ATUALIZADO
import Integrantes from './components/Integrantes'; // <--- ATUALIZADO


function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      
      <main className="min-h-screen bg-background text-text p-4 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/integrantes" element={<Integrantes />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
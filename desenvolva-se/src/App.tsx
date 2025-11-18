import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importe os componentes de roteamento
import Cabecalho from './components/Cabecalho'; 
// Importe seus componentes de página aqui (vamos criá-los em commits futuros)
import Home from './components/Home'; // Vamos criar esta página
import Cursos from './components/Cursos'; // Vamos criar esta página
import Sobre from './components/Sobre'; // Vamos criar esta página
import Contato from './components/Contato'; // Vamos criar esta página
import Integrantes from './components/Integrantes'; // Vamos criar esta página


function App() {
  // O estado 'count' pode ser removido se não for mais utilizado
  const [count, setCount] = useState(0); 

  return (
    <BrowserRouter> {/* Envolve todo o aplicativo para habilitar o roteamento */}
      <Cabecalho /> {/* O Cabeçalho fica fora do <Routes> para aparecer em todas as páginas */}
      
      <main className="min-h-screen bg-background text-text p-4 transition-colors duration-300">
        <Routes> {/* Define as rotas do seu aplicativo */}
          <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
          <Route path="/cursos" element={<Cursos />} /> {/* Rota para Cursos */}
          <Route path="/sobre" element={<Sobre />} /> {/* Rota para Sobre */}
          <Route path="/contato" element={<Contato />} /> {/* Rota para Contato */}
          <Route path="/integrantes" element={<Integrantes />} /> {/* Rota para Integrantes */}
          {/* Adicione outras rotas aqui conforme necessário */}
        </Routes>
      </main>
      {/* O Footer (se existir) também ficaria aqui, fora do <Routes> */}
    </BrowserRouter>
  );
}

export default App;
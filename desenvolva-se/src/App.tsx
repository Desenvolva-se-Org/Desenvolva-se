import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cabecalho from './components/Cabecalho'; 
// Importações ajustadas para 'src/components/'
import Home from './routes/Home';      
import Cursos from './routes/Cursos';  
import Sobre from './routes/Sobre';    
import Contato from './routes/Contato';
import Integrantes from './routes/Integrantes';
import Rodape from './components/Rodape';


function App() {
  return (
    // Usa o BrowserRouter para habilitar a navegação
    <BrowserRouter>
      <Cabecalho /> 
      
      {/* Classe main usa as variáveis de fundo e texto customizadas */}
      <main className="min-h-screen bg-background text-text transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/integrantes" element={<Integrantes />} />
        </Routes>
      </main>
      <Rodape />
    </BrowserRouter>
  );
}

export default App;
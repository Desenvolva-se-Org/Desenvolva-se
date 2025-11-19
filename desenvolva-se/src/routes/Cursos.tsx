import React from 'react';

const Cursos: React.FC = () => {
  return (
    <div className="container mx-auto py-8 min-h-[50vh]">
      <h1 className="text-5xl font-title text-secondary text-center">Catálogo de Cursos</h1>
      <p className="text-center mt-4 text-lg">Aqui você verá as recomendações personalizadas baseadas em IA.</p>
    </div>
  );
};

export default Cursos;
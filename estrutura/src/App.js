import React, { useState } from 'react';
import Navbar from './componentes/Nav';

const user = {
  name: 'gui'
};

function App() {
  // Definindo o estado do contador no nível do componente
  const [count, setCount] = useState(0);

  function handclick() {
    alert('test click');
  }


  function AdicionarNumero() {
    setCount(count + 1);
  }

  return (
    <>
      <Navbar />
      <h1>{user.name}</h1>
      <button onClick={handclick}>BOTÃO PARA ALERTAR</button>
      <button onClick={AdicionarNumero}>Test quantas vezes vc clicou: {count}</button>
    </>
  );
}

export default App;

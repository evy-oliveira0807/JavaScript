import React, { useState } from "react";

const Contador = () => {
  const [contador, setContador] = useState(0);

  function handleIncrementar() {
    setContador(contador + 1);
  }

  function handleDecrementar() {
    //Pode ser esse if
    //"setContador( contador === 0 ? 0 : contador - 1 )"

    //ou esse
    if (contador === 0) {
      setContador(0);
      return;
    } else {
      setContador(contador - 1);
    }
  }

  return (

    <div>

      <h1>Contador</h1>

      <p>{contador}</p>
      <button
        onClick={() => {handleIncrementar()}}>Incrementar </button>

      <button onClick={handleDecrementar}>Decrementar</button>
    </div>
  );
};

export default Contador;

import "./App.css";
import Title from "./components/Title/Title";
import CardEvento from "./components/CardEvento/CardEvento";
import Container from "./components/Container/Conteiner";
import Contador from "./components/Contador/Contador";
import Rotas from "./routes"

function App() {
  //Criar as [ropriedades titulo,texto,textolink
  //passar as propriedades em cada um dios 3 componentes abaixo
  return (
    <div className="App">
      {/* <h1>Hello World React</h1>
      <Title text="evelyn Oliveira" />
      <Container>
        <CardEvento
          titulo="Sql Server"
          texto="Lorem ipsum dolor sit amet"
          textoLink="conectar"
        />

        <CardEvento
          titulo="JavaScript"
          texto="Lorem ipsum dolor sit amet"
          textoLink="conectar"
        />

        <CardEvento
          titulo="C sharp"
          texto="Lorem ipsum dolor sit amet"
          textoLink="conectar"
        />
      </Container> */}

      <Container>
        <Contador></Contador>
      </Container>

      {/* <Rotas/> */}
    </div>
  );
}

export default App;

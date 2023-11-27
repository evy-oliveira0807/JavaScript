import React, { useContext, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

// Imports dos componentes - PÁGINAS
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProdutoPage from "./pages/ProdutoPage/ProdutoPage";
import ImportantePage from "./pages/ImportantePage/ImportantePage";
import MeusPedidosPage from "./pages/MeusPedidosPage/MeusPedidosPage";
import Nav from "./components/Nav/Nav";
import { ThemeContext } from "./context/ThemeContext";



const Rotas = () => {

  // const {ThemeContext} = useContext(ThemeContext);
  const [theme, setTheme] = useState("");

  //verifique se o tema esta no local storage ou assume o tema light
  function getThemeLocalStorage() {
    setTheme(
      localStorage.getItem("theme") ! == null
       ? localStorage.getItem("theme") : "light")
  }
  return (
    <BrowserRouter>
    <ThemeContext.Provider value={{theme, setTheme}}>

      <Nav />
      <Routes>
        <Route element={<HomePage />} path={"/"} exact />
        <Route element={<ProdutoPage />} path={"/produtos"} />
        <Route element={<LoginPage />} path={"/login"} />
        <Route element={<MeusPedidosPage />} path={"/meus-pedidos"} />
        <Route element={<ImportantePage />} path={"/importante"} />
        <Route element={<HomePage />} path={"*"} />
      </Routes>

      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

export default Rotas;

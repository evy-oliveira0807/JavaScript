import React, { useEffect, useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import TableTp from "./TableTp/TableTp";
import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";

const TipoEventosPage = () => {
  // states
  const [frmEdit, setFrmEdit] = useState(false); //está em modo edição?
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);
  const [notifyUser, setNotifyUser] = useState([]);

  useEffect(()=>{
    // define a chamada em nossa api
    async function loadEventsType() {
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
        console.log(retorno.data);

      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    }
    // chama a função/api no carregamento da página/componente
    loadEventsType();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault(); //evita o submit do formulário
    if (titulo.trim().length < 3) {
      
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "O título deve ter pelo menos 3 caracteres !",
        imgIcon: "warning",
        imgAlt: "Icone da ilustração de aviso. moça em frente a um simbolo de exclamação.",
        showMessage: true,
      })
      
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });

      setTitulo("");

      setNotifyUser({
              titleNote: "Sucesso",
              textNote: "Evento cadastrado com sucesso !",
              imgIcon: "sucess",
              imgAlt: "Icone da ilustração de sucesso. moça segurando um balão com simbolo de confirmação ok.",
              showMessage: true,
      })

      console.log(retorno);
    } catch (error) {
      alert("Deu ruim no submit");
    }
  }

  /********************* EDITAR CADASTRO *********************/
  // mostra o formulário de edição
  async function showUpdateForm(idElement) {
    
    setFrmEdit(true);
    try {
      const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(retorno.data.titulo);
    } catch (error) {
      
    }
    
  }
  // cancela a tela/ação de edição (volta para o form de cadastro)
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
  }
  // cadastrar a atualização na api
  async function handleUpdate(e) {
    e.preventDefault();
  }


   /********************* APAGAR DADOS *********************/
  // apaga o tipo de evento na api
  async function handleDelete(idElement) {

      if(! window.confirm("Confirma a exclusao?")){
        try {
          const promise = await api.delete(`${eventsTypeResource}/${idElement}`);
    
          if(promise.status === 204) {
            setNotifyUser({
              titleNote: "Sucesso",
              textNote: "Evento excluido com sucesso !",
              imgIcon: "sucess",
              imgAlt: "Icone da ilustração de sucesso. moça segurando um balão com simbolo de confirmação ok.",
              showMessage: true,
            })

            const buscaEventos = await api.get(eventsTypeResource);
            setTipoEventos(buscaEventos.data);
          }
        } catch (error) {
          alert("Problemas ao apagar o elemento!")
        }
      }
}

  return (
    <>
    {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <MainContent>
        {/* formulário de cadastro do tipo do evento */}
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro Tipo de Eventos"} />

              <ImageIllustrator imageRender={tipoEventoImage} />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou editar? */}
                {!frmEdit ? (
                  // Cadastrar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                  </>
                ) : (
                  // Editar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <div className="buttons-editbox">
                    <Button
                      textButton="Atualizar"
                      id="atualizar"
                      name="Atualiza"
                      type="submit"
                      additionalClass="button-component--middle"
                    />
                    <Button
                      textButton="Cancelar"
                      id="cancelar"
                      name="Cancelar"
                      type="button"
                      manipulationFunction={editActionAbort}
                      additionalClass="button-component--middle"
                    />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        {/* Listagem de tipo de eventos */}
        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Lista Tipo de Eventos"} color="white" />

            <TableTp
              dados={tipoEventos}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;

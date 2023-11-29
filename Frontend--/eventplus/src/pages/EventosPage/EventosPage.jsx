import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Title from '../../components/Title/Title';
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import eventoImage from "../../assets/images/evento.svg";
import { Select, Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource, eventsResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import TableEvento from "../EventosPage/TableTp/TableTp";
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import Spinner from "../../components/Spinner/Spinner"




const EventosPage = () => {

  const [frmEdit, setFrmEdit] = useState(false);
  const [idEvento, setidEvento] = useState([]);
  const [tipoEvento, setTipoEventos] = useState([]);
  const [idTipoEvento, setIdTipoEvento] = useState('');
  const [eventos, setEventos] = useState([]);
  const [dataEvento, setDataEvento] = useState();
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");

  const [notifyUser, setNotifyUser] = useState();//componente notification
  const [showSpinner, setshowSpinner] = useState(false);//componente spinner
  const idInstituicao = "06530568-a166-441c-b773-e6a2ec971e7d";

  function dePara(retornoApi) {
    let arrayOptions = [];
    retornoApi.forEach(e => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });
    return arrayOptions;
  }
  /****PONTE PARA DADOS DA API DE EVENTOS ****/
  useEffect(() => {
    // define a chamada em nossa api
    //Declaração de uma função assíncrona chamada "loadEventsType" para carregar os eventos.
    async function loadEvents() {
      setshowSpinner(true)
      await setTimeout(()=> {
        console.log();
      },2000)
      try {
        const retorno = await api.get(eventsResource);
        setEventos(retorno.data);
        console.log(retorno.data);

      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }

      setshowSpinner(false)
    }
    // chama a função/api no carregamento da página/componente
    loadEvents();
  }, []);
  /****PONTE PARA DADOS DA API PARA TIPO DE EVENTOS***/
  useEffect(() => {
    // define a chamada em nossa api
    //Declaração de uma função assíncrona chamada "loadEventsType" para carregar os tipos de evento.
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

  /***função options**** */
  function dePara(retornoApi) {
    let arrayOptions = [];//array pra guardar eventos da api
    retornoApi.forEach(e => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });//foreach que lÊ e guarda os tipos de evento no array de options
    return arrayOptions;
  }


  //*****Cadastrar Evento******* */
  async function handleSubmit(e) {
    e.preventDefault(); //evita o submit do formulário
    //condição para fazer o cadastro
    if (nomeEvento.trim().length < 3) {
      //notifica o usuario de que a ação foi relizada
      setNotifyUser({
        titleNote: "Aviso",
        textNote: 'Preencha todos os dados',
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de aviso. Moça em frente a um símbolo de exclamação",
        showMessage: true,
      });
      return;
    }

    try {
      //cadastra na api
      const retorno = await api.post(eventsResource, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idInstituicao: idInstituicao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        tipoEvento: tipoEvento
      })
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: 'Evento Cadastrado com sucesso',
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação",
        showMessage: true,
      });

      //limpa o state;
      setNomeEvento('');
      setDescricao('');
      setDataEvento('');


      //atuzaliza os dados na api.
      const response = await api.get(eventsResource);
      setEventos(response.data);


      console.log(retorno);

    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `deu ruim no submit`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });

      console.log(error);

    }
  }

  /****Editar evento */
  async function showUpdateForm(idElement) {
    setFrmEdit(true);
    setidEvento(idElement);//id do elemento para poder atualizar
    try {
      const retorno = await api.get(`${eventsResource}/${idElement}`)
      setNomeEvento(retorno.data.nomeEvento);
      setDescricao(retorno.data.descricao);
      setIdTipoEvento(retorno.data.idTipoEvento);
      setDataEvento(dateFormatDbToView(retorno.data.dataEvento))
      console.log(retorno.data);
      
    } catch (error) {
      
    }
  }

  // cancela a tela/ação de edição (volta para o form de cadastro)
  function editActionAbort() {
    setFrmEdit(false);
    setNomeEvento('');
    setidEvento(null);
  }
  async function handleUpdate(e) {
    e.preventDefault();

    const retorno = await api.put(eventsResource + "/" + idEvento, {
      nomeEvento: nomeEvento,
      descricao: descricao,
      idInstituicao: idInstituicao,
      idTipoEvento: idTipoEvento,
      dataEvento: dataEvento,
      tipoEvento: tipoEvento
    })
    try {
      if (retorno.status === 204) {
        //notificar o usúario
        setNotifyUser({
          titleNote: "Aviso",
          textNote: 'Cadastro atuzalizado com sucesso',
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação",
          showMessage: true
        });
        //atualizar os dados na tela
        const retorno = await api.get(eventsResource);
        setEventos(retorno.data);

      }
    }
    catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: 'erro ao Atualizar, por favor verifique a conexão',
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });
    }
  }


  //*****Apagar Evento******* */

  async function handleDelete(idElement,e) {
    e.preventDefault(e)
    setshowSpinner(true)
    try {
      //promise que chama a rota delete passando o id do evento
      const promise = await api.delete(`${eventsResource}/${idElement}`);
      //condição com mensagem para confirmar a exclusão
      if (window.confirm("confirma a exclusão?")) {

        if (promise.status === 204) {
          setNotifyUser({
            titleNote: "Exclusão",
            textNote: `Evento apagado com sucesso`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
            showMessage: true,
          });

          //atualiza os dados da api dando um get
          const buscaEventos = await api.get(eventsResource);

          setEventos(buscaEventos.data);
        }
        setshowSpinner(false)
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "erro",
        textNote: `problema ao apagar,verifique a conexão`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });
    }
  }



  // Sessão do HTML
  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {showSpinner ? <Spinner/> : null}
      {/* TITULO E IMAGEM DA PAGINA */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Cadastro de Eventos"} />

            <ImageIllustrator imageRender={eventoImage} />

            {/* FORMULARIO DE CADASTRO */}
            <form className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}>
              {!frmEdit ? (<>
                {/*cadastrar */}
                <Input
                  id="nomeEvento"
                  placeholder="Nome"
                  name={"nomeEvento"}
                  type={"text"}
                  required={"required"}
                  value={nomeEvento}
                  manipulationFunction={(e) => {
                    setNomeEvento(e.target.value);
                  }}
                />
                <Input
                  id="descricao"
                  placeholder="Descrição"
                  name={"descricao"}
                  type={"text"}
                  required={"required"}
                  value={descricao}
                  manipulationFunction={(e) => {
                    setDescricao(e.target.value);
                  }}
                />
                <Select
                  id='TiposEvento'
                  name={'tiposEvento'}
                  placeholder={"Tipos Evento"}
                  required={'required'}
                  options={dePara(tipoEvento)}
                  value={idTipoEvento}
                  manipulationFunction={(e) => {
                    setIdTipoEvento(e.target.value)
                  }}
                />

                <Input
                  id="dataEvento"
                  placeholder="Data"
                  name={"Data"}
                  type={"date"}
                  required={"required"}
                  value={dataEvento}
                  manipulationFunction={(e) => {
                    setDataEvento(e.target.value);
                  }}
                />
                <Button
                  textButton="Cadastrar"
                  id="cadastrar"
                  name="cadastrar"
                  type="submit"
                />





              </>) : (<>




              {/* editar */}

                <Input
                  id="nomeEvento"
                  placeholder="Nome"
                  name={"nomeEvento"}
                  type={"text"}
                  required={"required"}
                  value={nomeEvento}
                  manipulationFunction={(e) => {
                    setNomeEvento(e.target.value);
                  }}
                />
                <Input
                  id="descricao"
                  placeholder="Descrição"
                  name={"descricao"}
                  type={"text"}
                  required={"required"}
                  value={descricao}
                  manipulationFunction={(e) => {
                    setDescricao(e.target.value);
                  }}
                />
                <Select
                  id='TiposEvento'
                  name={'tiposEvento'}
                  required={'required'}
                  options={dePara(tipoEvento)}
                  defaultValue={idTipoEvento}
                  manipulationFunction={(e) => {
                    setIdTipoEvento(e.target.value)
                  }}
                />
                <Input
                  id="dataEvento"
                  placeholder="Data"
                  name={"Data"}
                  type={"date"}
                  required={"required"}
                  value={dataEvento}
                  manipulationFunction={(e) => {
                    setDataEvento(e.target.value);
                  }}
                />
                <div className="buttons-editbox" >
                  <Button
                    textButton="Atualizar"
                    id="atualizar"
                    name="atualizar"
                    type="submit"
                    additionalClass="button-component--middle"
                  />

                  <Button
                    textButton="Cancelar"
                    id="Cancelar"
                    name="Cancelar"
                    type="button"
                     manipulationFunction={editActionAbort}
                    additionalClass="button-component--middle"
                  />
                </div>
              </>)}

            </form>
          </div>
        </Container>
      </section>
      {/* Listagem de tipo de eventos */}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Eventos"} color="white" />

          <TableEvento
            dados={eventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>

    </MainContent>
  );
};

export default EventosPage;
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './classes/pokemon';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactDOM from 'react-dom';



function App() {
  const [posicao, setPosicao] = React.useState(0);
  const [habilidade, setHabilidade] = React.useState(null);
  const [nomeHabilidade, setNomeHabilidade] = React.useState(null);
  const [nomePokemon, setNomePokemon] = React.useState();
  const [mostraBotao, setMostraBotao] = React.useState(false);
  const [mostrarPokemons, setMostrarPokemons] = React.useState(false);
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [cartasNaMao, setCartasNaMao] = React.useState<Pokemon[]>([]);


  const sorteados = () => {

    for (let i = 0; i < 32; i++) {

      let num = getRandom(1, 500);
      axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then(response => {
          let data = response.data;
          let poke = new Pokemon(
            num, data.name,
            data.sprites.other['official-artwork'].front_default,
            getStat(data, 0), getStat(data, 1),
            getStat(data, 2), getStat(data, 3),
            getStat(data, 4), getStat(data, 5)
          );
          pokemons.push(poke)
        })
    }

    setTimeout(() => {
      cartasNaMao.push(pokemons[0], pokemons[1], pokemons[2], pokemons[3], pokemons[4]);
      console.log(cartasNaMao)
      setMostrarPokemons(true);
      setMostraBotao(true);
      pokemons.splice(0, 5);
    }, 1000)




  }

  const getStat = (data: any, index: any) => {
    return data.stats[index].base_stat
  }

  function getRandom(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const montaHabilidade = (habilidade: any, nomeHabilidade: any, nomePokemon: any) => {
    setHabilidade(habilidade);
    setNomeHabilidade(nomeHabilidade);
    setNomePokemon(nomePokemon);
  }

  const jogar = () => {

    setTimeout(() => {
      const index = cartasNaMao.findIndex(i => i.nome == nomePokemon);
      cartasNaMao.splice(index, 1);
      cartasNaMao.push(pokemons[0])
      pokemons.splice(0, 1);
    }, 1000);

    console.log(cartasNaMao)

  }


  //TODOS OS METODOS COM PRIMEIRA LETRA MAIUSCULA SÃO COMPONENTES
  const MostraHabilidade = () => {
    return (
      <div className="habilidade">
        <h3>Pokemon: {nomePokemon}</h3>
        <h4>{nomeHabilidade}: {habilidade}</h4>
      </div>
    )
  }


  const PlayGame = () => {
    let pos: number = 0;
    return (
      <Fragment>

        <Container className="mw-100">
          <Row>
            {
              cartasNaMao.map(carta =>
                <Col className="row d-flex justify-content-center">
                  <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={carta.img} />
                    <Card.Body>
                      <Card.Title className="font-weight-bold text-uppercase card text-center">{carta.nome}</Card.Title>
                      <Card.Text>
                        <h5 onClick={() => montaHabilidade(carta.hp, "HP", carta.nome)} >HP: {carta.hp}</h5>
                        <h5 onClick={() => montaHabilidade(carta.ataque, "Ataque", carta.nome)}>Ataque: {carta.ataque}</h5>
                        <h5 onClick={() => montaHabilidade(carta.defesa, "Defesa", carta.nome)}>Defesa: {carta.defesa}</h5>
                        <h5 onClick={() => montaHabilidade(carta.ataque_especial, "Ataque Especial", carta.nome)}>Ataque especial: {carta.ataque_especial}</h5>
                        <h5 onClick={() => montaHabilidade(carta.defesa_especial, "Defesa Especial", carta.nome)}>Defesa especia: {carta.defesa_especial}</h5>
                        <h5 onClick={() => montaHabilidade(carta.velocidade, "Velocidade", carta.nome)}>Velocidade: {carta.velocidade}</h5>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            }

          </Row>
        </Container >

      </Fragment>

    )

  }


  return (

    <Fragment>
      <div className="header">
        {mostraBotao ? <div>GO GO!</div> : <button id="botaoJogar" onClick={sorteados}>Começar Jogo</button>}
      </div>

      {habilidade != null ?
        <div>
          <MostraHabilidade />
          <button id="botaoConfirmar" onClick={() => jogar()}>Confirmar carta</button>
        </div>
        : null}

      {mostrarPokemons ? <PlayGame /> : null}
    </Fragment>


  );

}



export default App;

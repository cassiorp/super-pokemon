import React, { Fragment, useState, useEffect } from 'react';
import Carta from './components/carta/carta';
import axios from 'axios';
import Pokemon from './classes/pokemon';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactDOM from 'react-dom';



function App() {
  const [habilidade, setHabilidade] = useState();
  const [quantidadeCartas, setQuantidadeCartas] = useState();
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
    console.log(pokemons)

    setTimeout(() => {
      cartasNaMao.push(pokemons[0], pokemons[1], pokemons[2], pokemons[3], pokemons[4]);
      console.log(cartasNaMao)
      renderizaPokemons();
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

  const setaHabilidade = (habilidadeEscolhida: any) => {
    setTimeout(() => {
      setHabilidade(habilidadeEscolhida);
    }, 1000)
    setTimeout(() => {
      alert(habilidade)
    }, 1000)

  }



  function renderizaPokemons() {
    const cards =

      <Container className="mw-100">
        {habilidade}
        <Row>
          {
            cartasNaMao.map(carta =>
              <Col className="row d-flex justify-content-center">
                <Card style={{ width: '18rem' }} >
                  <Card.Img variant="top" src={carta.img} />
                  <Card.Body>
                    <Card.Title>{carta.nome}</Card.Title>
                    <Card.Text>
                    <h5 onClick={() => setaHabilidade(carta.hp)}>HP: {carta.hp}</h5>
                    <h5 id='ataque'>ataque:{carta.ataque}</h5>
                    <h5 id='defesa'>defesa:{carta.defesa}</h5>
                    <h5 id='ataque especial'>ataque especial:{carta.ataque_especial}</h5>
                    <h5 id='defesa especia'>defesa especia:{carta.defesa_especial}</h5>
                    <h5 id='velocidade'>velocidade:{carta.velocidade}</h5>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          }
        </Row>
      </Container >

      ReactDOM.render(cards, document.getElementById('root'));

  }


  return (

    <Fragment>

      <button onClick={sorteados}>Sortear</button>
      <button onClick={() => setaHabilidade(50)}></button>
      <div id='root'>
        

      </div>
    </Fragment>
  );

}



export default App;

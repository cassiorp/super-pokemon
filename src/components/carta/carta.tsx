import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import pokemon from '../img/006.png';
import { Card, Button } from 'react-bootstrap';


interface Props {
    nome: string;
    hp: number;
    img: any;
    ataque: number;
    defesa: number;
    ataque_especial: number;
    defesa_especial: number;
    velocidade: number;
 }

function Carta(props: Props) {
    const { nome, hp, img, ataque, defesa, 
        ataque_especial, defesa_especial, velocidade} = props;
    
    
    return (
        <Card style={{ width: '18rem' }} >
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{nome}</Card.Title>
                <Card.Text>
                    <h5 >HP:{hp}</h5>
                    <h5 >ataque:{ataque}</h5> 
                    <h5 >defesa:{defesa}</h5>
                    <h5  >ataque especial:{ataque_especial}</h5>
                    <h5 >defesa especia:{defesa_especial}</h5>
                    <h5 >velocidade:{velocidade}</h5>
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default Carta;
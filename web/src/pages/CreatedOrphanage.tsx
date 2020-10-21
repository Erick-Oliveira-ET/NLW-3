import React from 'react';

import '../styles/pages/created-orphanage.css';

import confirmImg from '../images/confirm.svg';
import { Link } from 'react-router-dom';

const CreatedOrphanage = () => {
    return (
        <div id="container">
            <div className="content-wrapper">
                <main>
                    <h1>Ebaaa!</h1>
                    <p>O cadastro deu certo e foi enviado
                    ao administrador para ser aprovado.
                    Agora é só esperar :)</p>
                    
                    <Link to="/app" className="map-button">
                        Voltar para o mapa
                    </Link>
                </main>
            
                
                <img src={confirmImg} alt=""/>

                
            </div>

        </div>
    );
} 

export default CreatedOrphanage;
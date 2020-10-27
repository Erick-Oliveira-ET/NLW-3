import React from 'react';

import '../styles/pages/deleted-orphanage.css';

import deleteImg from '../images/delete.svg';
import { Link } from 'react-router-dom';

const DeletedOrphanage = () => {
    return (
        <div id="container">
            <div className="content-wrapper">
                <main>
                    <h1>Excluir!</h1>
                    <p>Você excluiu o orfanato com sucesso.</p>
                    
                    <Link to="/dashboard" className="map-button">
                        Voltar para o dashboard
                    </Link>
                </main>
            
                
                <img src={deleteImg} alt=""/>

                
            </div>

        </div>
    );
} 

export default DeletedOrphanage;
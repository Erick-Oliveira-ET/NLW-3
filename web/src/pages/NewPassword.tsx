import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoVertical from '../images/logo-vertical.svg';

import "../styles/pages/new-password.css";

const NewPassword = () => {
    const [email, setEmail] = useState('');

    const onSubmitHandle = async (event: FormEvent) => {
        console.log(event);
    }

    return (
        <div id="login-container">
             <div className="login-content">
                <div className="login-content-flex">
                    <img src={logoVertical} alt="Logo"/>
                    
                    <div className="login-text-content">
                        <strong>Minas Gerais</strong>
                        <span>Uberlandia</span>
                    </div>

                </div>

                
            </div>

            <div className="login-form-wrapper">
                <Link to="/" className="login-back-button" > 
                    <FiArrowLeft size={26} color="#15C3D6" />
                </Link>

                <form onSubmit={onSubmitHandle} className="login-form">
                
                <h1>Esqueci a Senha</h1>
                <p>Sua redefinição de senha será enviada
                    para o e-mail cadastrado.</p>
                
                <div className="input-block">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" 
                        value={email} onChange={event => setEmail(event.target.value)}
                    />

                </div>

                <button type="submit">Entrar</button>
                
                </form>

            </div>

        </div>
    )

}

export default NewPassword;
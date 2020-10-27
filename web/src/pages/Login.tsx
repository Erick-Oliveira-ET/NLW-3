import React from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoVertical from '../images/logo-vertical.svg';

import "../styles/pages/login.css";

import { useAuth } from '../context/auth';


const Login: React.FC = () => {
    const history = useHistory();

    const { signIn } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemeber] = useState('false');

    const onSubmitHandle = async (event: FormEvent) => {
        event.preventDefault();
        const isLoged = signIn(email, password);

        if (isLoged) {
            history.push('/');
        }
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
                
                <h1>Fazer Login</h1>
                
                <div className="input-block">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" required
                        value={email} onChange={event => setEmail(event.target.value)}
                    />

                </div>

                <div className="input-block">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" required
                        value={password} onChange={event => setPassword(event.target.value)}
                    />

                </div>

                <div className="login-input-block-footer">
                    <div className="input-block checkbox">
                        <input type="checkbox"
                            value={remember} onChange={event => setRemeber(event.target.value)}
                        />
                        <label htmlFor="password" className="label-remember">Lembrar-me
                        </label>
                    </div>

                    <Link to="/remember" className="login-remember"> Esqueci minha senha </Link>
                </div>

                <button type="submit">Entrar</button>
                
                </form>

            </div>

        </div>

    )
}

export default Login;
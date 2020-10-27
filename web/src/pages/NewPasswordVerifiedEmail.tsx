import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import logoVertical from '../images/logo-vertical.svg';

import "../styles/pages/new-password-verification.css"

const NewPasswordVerifiedEmail = () => {
    const [newPassword, setNewPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [isPassVisib, setIsPassVisib] = useState(false);
    const [isPassVisibVerification, setIsPassVisibVer] = useState(false);
    
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
                
                <h1>Redefinição de Senha</h1>
                <p>Escolha uma nova senha para você
                    essar o dashboard do Happy.</p>
                
                <div className="input-block">
                    <label htmlFor="newPassword">Nova Senha</label>
                    <div className="input-block-eye">
                        <input className="newPassword" 
                            type={ isPassVisib ? '' : 'password' }
                            value={newPassword} onChange={event => setNewPassword(event.target.value)}
                        />
                    
                        
                        { isPassVisib ? 
                            <AiOutlineEyeInvisible 
                                onClick={() => setIsPassVisib(!isPassVisib)} 
                                className="eyepassword" size={26} color="#15C3D6"
                            />
                        
                            :
                        
                            <AiOutlineEye 
                                onClick={() => setIsPassVisib(!isPassVisib)}
                                className="eyepassword" size={26} color="#8FA7B2"
                            />

                        }


                    </div>

                </div>

                
                <div className="input-block">
                    <label htmlFor="passwordVerification">Repetir Senha</label>
                    <div className="input-block-eye">
                        <input className="newPassword" 
                            type={ isPassVisibVerification ? '' : 'password' }
                            value={passwordVerification} onChange={event => setPasswordVerification(event.target.value)}
                        />

                        { isPassVisibVerification ? 
                            <AiOutlineEyeInvisible 
                                onClick={() => setIsPassVisibVer(!isPassVisibVerification)} 
                                className="eyepassword" size={26} color="#15C3D6"
                            />
                        
                            :
                        
                            <AiOutlineEye 
                                onClick={() => setIsPassVisibVer(!isPassVisibVerification)} 
                                className="eyepassword" size={26} color="#8FA7B2"
                            />

                        }

                    </div>

                </div>

                <button type="submit">Entrar</button>
                
                </form>

            </div>

        </div>
    )

}

export default NewPasswordVerifiedEmail;
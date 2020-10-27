import React, { useState, MouseEvent, useEffect } from 'react';
import {  FiAlertCircle, FiMapPin, FiPower} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Card from '../components/Card';
import CardCad from '../components/CardCad';
import { useAuth } from '../context/auth';

import mapMarkerImg from '../images/map-marker.svg';
import api from '../services/api';

import '../styles/pages/dashboard.css'

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const Dashboard = () => {
    const { goBack } = useHistory();
    const { signOut } = useAuth();

    const [ orphanagesVerified, setOrphanagesVerified] = useState<Orphanage[]>([]);
    const [ orphanagesNotVerified, setOrphanagesNotVerified] = useState<Orphanage[]>([]);
    const [locBtnActive, setLocBtnActive] = useState(true);

    const active = {
        color: '#0089A5',
        background: '#FFD666'
    }

    const inactive = {
        color: '#FFF',
    }

    useEffect(()=>{
        api.get('orphanages/true').then(res =>{
            setOrphanagesVerified(res.data);
        })

        api.get('orphanages/false').then(res =>{
            setOrphanagesNotVerified(res.data);
        })
    
    }, []);

    function clickChangeHandler(event: MouseEvent) {
        event.preventDefault();

        setLocBtnActive(!locBtnActive);
    }

    return (
        <div className="dashboard-container">
            <aside className="app-sidebar">
                <Link to="/app" >
                    <img src={mapMarkerImg} alt="Happy" />
                </Link>
    
                <div className="dashboard-options">
                    <button type="button" onClick={clickChangeHandler}
                        style={locBtnActive ? active : inactive}
                    >
                        <FiMapPin size={24} color="#0089A5" />
    
                    </button>
    
                    <button type="button" onClick={clickChangeHandler} 
                        style={ !locBtnActive ? active : inactive}
                    >
                        <FiAlertCircle size={24} />
    
                    </button>
                </div>
    
                <footer>
                <button type="button" onClick={() => {signOut()}}
                >
                    <FiPower size={24} color="#FFF" />
                </button>
                </footer>
            </aside>

            {
                locBtnActive ? 
                <div className="dashboard-fieldset">
                        <h2>Orfanatos cadastrados</h2>

                        <div className="cards-container">
                        {orphanagesVerified.map(orphanage => {
                            return (
                                <Card key={orphanage.id} 
                                    id={orphanage.id} name={orphanage.name} 
                                    positionIcon={{latitude: orphanage.latitude, longitude: orphanage.longitude}} 
                                />
                            )
                        })}

                            
                        </div>

                    </div>
                :
                <div className="dashboard-fieldset">
                    <h2>Cadastros Pendentes</h2>

                    <div className="cards-container">
                        {orphanagesNotVerified.map(orphanage => {
                            return (
                                <CardCad key={orphanage.id} 
                                    id={orphanage.id} name={orphanage.name}
                                    positionIcon={{latitude: orphanage.latitude, longitude: orphanage.longitude}}  
                                />

                            )

                        })}

                    </div>

                </div>

            }        

        </div>
    )
}

export default Dashboard;
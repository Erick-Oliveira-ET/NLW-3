import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanage-map.css';
import api from '../services/api';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanageMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(()=>{
        api.get('orphanages').then(res =>{
            setOrphanages(res.data);
        })
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão
                    esperando a sua visita :)</p>

                </header>
                
                <footer>
                    <strong>Minas Gerais</strong>
                    <span>Uberlandia</span>
                </footer>
            </aside>

            <Map 
                center={[-18.927571,-48.2692181]}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            > 
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {/* pk.eyJ1IjoiZXJpY2stb2xpdmVpcmEiLCJhIjoiY2tnOWk3NGs0MDB2bjJydDZ2ZWVqODM0ZSJ9.leZOXfbxDgaUqwKEIPHzkw */ }
            
            {orphanages.map(orphanage => {
                return(
                    <Marker
                        icon={mapIcon}
                        position={[orphanage.latitude,orphanage.longitude]}
                        key={orphanage.id}
                    >
                        <Popup
                            closeButton={false}
                            minWidth={240}
                            maxWidth={240}
                            className="map-popup"
                        >
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={28} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>

                );
            })}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />

            </Link>
        </div>
    );
}

export default OrphanageMap;
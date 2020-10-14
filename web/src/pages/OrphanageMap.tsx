import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import {Map, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanage-map.css';

function OrphanageMap(){
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
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />

            </Link>
        </div>
    );
}

export default OrphanageMap;
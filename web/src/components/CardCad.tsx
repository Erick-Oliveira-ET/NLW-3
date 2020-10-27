import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import mapIcon from "../utils/mapIcon";
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/components/card.css';

interface CardProps{
    positionIcon: {latitude: number, longitude: number};
    name: string;
    id: number;
}

const CardCad = ({positionIcon, name, id}: CardProps) =>{
    return (
        <div id="card-orphanage">
            
            <Map 
                    center={[positionIcon.latitude,positionIcon.longitude]} 
                    style={{ width: '100%', height: 225, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                    zoom={15}
                >
                    <TileLayer 
                    // `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
                        url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    <Marker 
                        interactive={false} 
                        icon={mapIcon} 
                        position={[
                            positionIcon.latitude,
                            positionIcon.longitude
                        ]}
                    />
                
                </Map>
       
            <footer className="card-footer">
                <h2>{name}</h2>

                <div className="card-buttons">
                    <Link to={`/status/${id}`} className="card-button" >
                        <FiArrowRight size={24} />
                    </Link>

                </div>

            </footer>

        </div>
    )
}

export default CardCad;
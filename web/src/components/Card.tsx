import React, { MouseEvent  } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import mapIcon from "../utils/mapIcon";
import { Link, useHistory} from 'react-router-dom';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import '../styles/components/card.css';
import api from '../services/api';

interface CardProps{
    positionIcon: {latitude: number, longitude: number};
    name: string;
    id: number;
}

const Card = ({positionIcon, name, id}: CardProps) =>{
    const history = useHistory();
    
    async function handleDelete(event: MouseEvent){
        event.preventDefault();
        const response = await api.delete(`/orphanages/${id}`);

        if(response.status === 200){
            history.push('/delete');
        }
    }
    
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
                    <Link to={`/edit/${id}`} className="card-button edit" >
                        <FiEdit3 size={24} />
                    </Link>

                    <button onClick={handleDelete} className="card-button delete" >
                        <FiTrash size={24} />
                    </button>
                </div>

            </footer>

        </div>
    )
}

export default Card;
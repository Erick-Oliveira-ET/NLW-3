import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";
import { useHistory, useParams } from 'react-router-dom';


import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage{
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>
}

interface OrphanageParams{
  id: string;
}

const Edit = () => {
  const history = useHistory();
  const params = useParams<OrphanageParams>();
  // const [orphanage, setOrphanage] = useState<Orphanage>();
  // const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [id, setId] = useState<number>();
  const [position, setPosition] = useState({latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  // const [latitude, setLatitude] = useState<number>(0);
  // const [longitude, setLongitude] = useState<number>(0);
  
  useEffect(()=>{
      api.get(`/orphanage/${params.id}`).then(res =>{
          // setOrphanage(res.data);
          console.log(res);
          
          setId(res.data.id);
          setPosition({latitude: res.data.latitude, longitude: res.data.longitude});
          setName(res.data.name);
          setAbout(res.data.about);
          setInstructions(res.data.instructions);
          setOpeningHours(res.data.opening_hours);
          setOpenOnWeekends(res.data.open_on_weekends);
          setImages(res.data.images);
      })

  }, [params.id]);

  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;
  
    setPosition({
      latitude: lat,
      longitude: lng
    })
  
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      //Create a URL of an image
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);

  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('id', String(id));
    data.append('name',name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    const res = await api.put('/orphanages', data);

    if(res.status === 201){
      history.push('/dashboard');
    }

  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[position.latitude,position.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
              // `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              { position.latitude !== 0 &&
              <Marker 
                interactive={false} 
                icon={mapIcon} 
                position={[
                  position.latitude,
                  position.longitude
                ]} 
              />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
                value={name} onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} 
                value={about} onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image => {
                    return (
                      <img key={image} src={image} alt={name} />
                    )
                  })
                }

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

                <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" 
                value={instructions} onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" 
                value={opening_hours} onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? "active" : ''}
                  onClick={()=>setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button type="button" className={!open_on_weekends ? "active" : ''}
                  onClick={()=>setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>

        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
export default Edit;
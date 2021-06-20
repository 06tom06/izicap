import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import React from "react";
import {Shop} from "./Objects";
import Venue from './Venue';
import "./App.css";
import CardMedia from '@material-ui/core/CardMedia';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

type GeoPprops = {
    latitude: number,
    longitude: number,
    shops: Shop[]
}

export default function CustomMap(props: GeoPprops) {
    // Default coordinates set to Oslo central station
    const position : LatLngExpression = [props.latitude, props.longitude];
    const zoom : number = 9;

    const iconMarkup = ()  => renderToStaticMarkup(
        <i className="fa fa-map-marker fa-2x" aria-hidden="true" style={{backgroundColor:"white", padding: 3, borderRadius: "50%", color:"red"}}/>
      );

    const createIcon = () => divIcon({
        html: iconMarkup()
    });  

    function getMarkerIcon() {
        
        return createIcon();
      }

    return (
        <MapContainer style={{ margin:0, width: `100%`, height: '100%'}} center={position} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                props.shops.map(s => {
                    const icon = s.categories && s.categories[0] ? (s.categories[0].icon ? s.categories[0].icon.prefix + "88" + s.categories[0].icon.suffix : "" ): "";
                    return <Marker icon={getMarkerIcon()} position={[s.location.lat, s.location.lng]}>
                        <Popup>
                           {icon && icon !== "" && <div><CardMedia
                        style={{height: 50, width: 50, backgroundColor: "grey"}}
                        image={icon.replace('\/', '/')}
                        title="icon"
                    />{<h3>{s.name}</h3>}</div>}
                           {<h6>{s.location.address}</h6>}
                        </Popup>
                    </Marker>
                })
            }
        </MapContainer>
        )
};
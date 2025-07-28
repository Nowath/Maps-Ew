"use client"
import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

export function MainMap() {
    // Bangkok coordinates: latitude 13.7563, longitude 100.5018
    const bangkokCenter: [number, number] = [13.7563, 100.5018];

    return (
        <>
            <MapContainer center={bangkokCenter} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Optional: Add a marker for Bangkok center */}
                {/* <Marker position={bangkokCenter}>
                    <Popup>
                        Bangkok, Thailand <br /> Default location
                    </Popup>
                </Marker> */}
            </MapContainer>
        </>
    )
}
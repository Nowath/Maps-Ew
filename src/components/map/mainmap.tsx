"use client"
import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet';

const myCustomIcon = L.icon({
    iconUrl: '/icon/marker.png',
    iconSize: [50, 50],
});

const redOptions = { color: 'red' }

export function MainMap() {
    const bangkokCenter: [number, number] = [13.7563, 100.5018];
    const RedZone1: [number, number] = [13.7560, 100.500];
    const RedZone2: [number, number] = [13.7580, 100.5012];
    const RedZone3: [number, number] = [13.7550, 100.5030];

    return (
        <>
            <MapContainer center={bangkokCenter} zoom={17} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={bangkokCenter} icon={myCustomIcon}>
                    <Popup>
                        ที่อยู่ปัจจุบัน
                    </Popup>
                </Marker>
                <Circle center={RedZone1} pathOptions={redOptions} radius={70}>
                    <Popup>โซนอันตราย</Popup>
                </Circle>
                <Circle center={RedZone2} pathOptions={redOptions} radius={40}>
                    <Popup>โซนอันตราย</Popup>
                </Circle>
                <Circle center={RedZone3} pathOptions={redOptions} radius={70}>
                    <Popup>โซนอันตราย</Popup>
                </Circle>
            </MapContainer>
        </>
    )
}
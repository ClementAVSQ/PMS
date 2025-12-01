<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
    width: 100%;
    height: 400px;
    border-radius: 8px;
}
</style>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

onMounted(() => {
    // Coordonnées de PMS à Nîmes
    const lat = 43.8291623;
    const lng = 4.3342007;

    // Initialiser la carte Leaflet
    const map = L.map('map').setView([lat, lng], 13);

    // Ajouter la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25
    }).addTo(map);

    // Ajouter un marqueur pour PMS
    L.marker([lat, lng])
        .bindPopup('<b>PMS - Propreté Maintenance Services</b><br/>151 rue Gilles Roberval<br/>30900 Nîmes<br/>04 89 41 08 07')
        .addTo(map)
        .openPopup();
})
</script>

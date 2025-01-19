import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const layers = [
  { name: "Bordures", path: "/geojson/gadm41_CMR_0.geojson", color: "black" },
  { name: "Régions", path: "/geojson/gadm41_CMR_1.geojson", color: "blue" },
  { name: "Départements", path: "/geojson/gadm41_CMR_2.geojson", color: "green" },
  { name: "Arrondissements", path: "/geojson/gadm41_CMR_3.geojson", color: "red" },
];

const MultiLayerMap: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoData, setGeoData] = useState<any[]>([]);

  useEffect(() => {
    // Charger les fichiers GeoJSON pour toutes les couches
    Promise.all(
      layers.map((layer) =>
        fetch(layer.path)
          .then((res) => res.json())
          .catch((err) =>
            console.error(`Erreur lors du chargement de la couche ${layer.name}:`, err)
          )
      )
    ).then((data) => setGeoData(data));
  }, []);

  return (
    <MapContainer
      center={[7.3697, 12.3547]} // Coordonnées approximatives pour centrer la carte sur le Cameroun
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* Afficher chaque couche avec un style spécifique */}
      {geoData.map((data, index) => (
        <GeoJSON
          key={index}
          data={data}
          style={() => ({
            color: layers[index].color,
            weight: 2,
            fillOpacity: 0.3,
          })}
        />
      ))}
    </MapContainer>
  );
};

export default MultiLayerMap;
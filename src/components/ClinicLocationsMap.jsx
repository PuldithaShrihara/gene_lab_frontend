import { useState } from "react";

const clinicLocations = [
  {
    id: "colombo",
    name: "Colombo Clinic",
    subtitle: "Ninewells Hospital & Durdans Hospital",
    description:
      "Weekly appointments at Ninewells Hospital & Durdans Hospital. Convenient for patients seeking post-test clinical planning.",
    mapQuery: "Ninewells Hospital Colombo Sri Lanka",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ninewells%20Hospital%20Colombo%20Sri%20Lanka",
  },
  {
    id: "galle",
    name: "Galle Clinic",
    subtitle: "Asiri Hospital Galle & Matara",
    description:
      "Consultations at Asiri Hospital Galle & Matara. Dedicated to providing genetics services to the Southern Province.",
    mapQuery: "Asiri Hospital Galle Sri Lanka",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Asiri%20Hospital%20Galle%20Sri%20Lanka",
  },
];

const getEmbedUrl = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export default function ClinicLocationsMap() {
  const [activeLocation, setActiveLocation] = useState(clinicLocations[0]);

  return (
    <section className="clinic-map-section">
      <div className="clinic-map-header">
        <span className="section-eyebrow">GOOGLE LOCATION</span>
        <h3>Find Our Clinic Locations</h3>
        <p>Select a clinic location to view it on Google Maps.</p>
      </div>

      <div className="clinic-map-grid">
        <div className="clinic-map-tabs">
          {clinicLocations.map((location) => (
            <button
              key={location.id}
              type="button"
              className={`clinic-location-tab ${
                activeLocation.id === location.id ? "active" : ""
              }`}
              onClick={() => setActiveLocation(location)}
              aria-pressed={activeLocation.id === location.id}
            >
              <span className="clinic-location-icon">📍</span>
              <span>
                <strong>{location.name}</strong>
                <small>{location.subtitle}</small>
                <p>{location.description}</p>
              </span>
            </button>
          ))}
        </div>

        <div className="clinic-map-frame-wrap">
          <iframe
            title={`${activeLocation.name} Google Map`}
            src={getEmbedUrl(activeLocation.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <div className="clinic-map-footer">
            <div>
              <strong>{activeLocation.name}</strong>
              <p>{activeLocation.subtitle}</p>
            </div>

            <a
              href={activeLocation.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clinic-map-link"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";

// Better resolution map URL as per your requirement
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

type Region = "south-asia" | "europe" | "north-america" | "africa";

interface Presence {
    name: string;
    coordinates: [number, number];
    region: Region;
}

// India intentionally excluded
const presences: Presence[] = [
    { name: "Bangladesh", coordinates: [90.3563, 23.685], region: "south-asia" },
    { name: "Pakistan", coordinates: [69.3451, 30.3753], region: "south-asia" },
    { name: "Afghanistan", coordinates: [69.1766, 34.5008], region: "south-asia" },
    { name: "Myanmar", coordinates: [95.956, 21.9162], region: "south-asia" },
    { name: "Indonesia", coordinates: [113.9213, -0.7893], region: "south-asia" },
    { name: "Kenya", coordinates: [37.9062, -0.0236], region: "africa" },
    { name: "Nigeria", coordinates: [8.6753, 9.082], region: "africa" },
    { name: "Ghana", coordinates: [-1.0232, 7.9465], region: "africa" },
    { name: "Ethiopia", coordinates: [40.4897, 9.145], region: "africa" },
];

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

export default function GlobalImpact() {
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState<[number, number]>([20, 15]);
    const [hovered, setHovered] = useState<string | null>(null);

    const zoomIn = () => setZoom((z) => Math.min(z * 1.5, MAX_ZOOM));
    const zoomOut = () => setZoom((z) => Math.max(z / 1.5, MIN_ZOOM));

    // Helper to check active presence countries
    const isActiveCountry = (geoName: string) => {
        return presences.some(p => p.name.toLowerCase() === geoName.toLowerCase());
    };

    return (
        <section className="relative z-10 py-36 md:py-32 px-5 sm:px-8 overflow-hidden bg-white dark:bg-[#0b0b12] transition-colors duration-300">
            <div className="container mx-auto">
                {/* Eyebrow + heading */}
                <div className="max-w-2xl mb-14 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
                    <p className="text-xs font-semibold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase mb-3">
                        Global Reach
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-gray-800 dark:text-white tracking-tight leading-[1.1]">
                        Where BHAC Works
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
                        Rooted in Bangladesh, connecting builders and problem-solvers across South Asia and
                        Africa
                    </p>
                </div>

                {/* Map card */}
                <div className="relative rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] overflow-hidden">
                    {/* Zoom controls */}
                    <div className="absolute top-5 right-5 z-20 flex flex-col gap-2">
                        <button
                            onClick={zoomIn}
                            disabled={zoom >= MAX_ZOOM}
                            aria-label="Zoom in"
                            className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg font-medium hover:bg-slate-700 dark:hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-lg"
                        >
                            +
                        </button>
                        <button
                            onClick={zoomOut}
                            disabled={zoom <= MIN_ZOOM}
                            aria-label="Zoom out"
                            className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg font-medium hover:bg-slate-700 dark:hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-lg"
                        >
                            −
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1] backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-xs font-medium text-slate-600 dark:text-gray-300">
                            Active presence
                        </span>
                    </div>

                    {/* Map Main Container */}
                    <div className="h-[420px] md:h-[520px] w-full bg-slate-50 dark:bg-[#0d0d16] transition-colors duration-300">
                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{ scale: 148 }}
                            className="w-full h-full"
                        >
                            <ZoomableGroup
                                zoom={zoom}
                                center={center}
                                minZoom={MIN_ZOOM}
                                maxZoom={MAX_ZOOM}
                                onMoveEnd={({ coordinates, zoom: z }) => {
                                    setCenter(coordinates);
                                    setZoom(z);
                                }}
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const countryName = geo.properties.name || "";
                                            const active = isActiveCountry(countryName);

                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    // Tailwind CSS classes handling dark mode properly without strict inline block styles
                                                    className={`outline-none transition-colors duration-200 ${active
                                                        ? "fill-slate-400 dark:fill-slate-600" // Active countries shade
                                                        : "fill-slate-200 dark:fill-[#1e1e2f]" // Normal countries shade
                                                        } hover:fill-indigo-200 dark:hover:fill-pink-950/40`}
                                                    style={{
                                                        default: { stroke: "#ffffff", strokeWidth: 0.5, outline: "none" },
                                                        hover: { stroke: "#ffffff", strokeWidth: 0.5, outline: "none" },
                                                        pressed: { outline: "none" }
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>

                                {presences.map((place) => (
                                    <Marker
                                        key={place.name}
                                        coordinates={place.coordinates}
                                        onMouseEnter={() => setHovered(place.name)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        {/* Pink marker node like your screenshot */}
                                        <circle
                                            r={4.5 / zoom}
                                            className="fill-indigo-500 stroke-white dark:stroke-[#0b0b12] animate-node-pulse cursor-pointer"
                                            strokeWidth={1 / zoom}
                                            style={{ transformOrigin: "center" }}
                                        />
                                        <circle
                                            r={9 / zoom}
                                            className="fill-pink-500/20 animate-ping pointer-events-none"
                                            style={{ animationDuration: "3s" }}
                                        />
                                    </Marker>
                                ))}
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>

                    {/* Hover tooltip */}
                    {hovered && (
                        <div className="absolute bottom-5 left-5 z-20 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium shadow-lg">
                            {hovered}
                        </div>
                    )}

                    {/* Impact stat card */}

                </div>
            </div>

            <style jsx global>{`
                @keyframes node-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                .animate-node-pulse {
                    animation: node-pulse 2s ease-in-out infinite;
                }
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fade-up 0.7s ease-out both;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-node-pulse,
                    .animate-fade-up {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </section>
    );
}

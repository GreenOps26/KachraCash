'use client';

import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MapPin, Search, Loader2, Navigation } from 'lucide-react';
import * as motion from 'motion/react-client';
import Markdown from 'react-markdown';

export default function FindRecyclersPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [results, setResults] = useState<string | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.error('Error getting location:', err);
        }
      );
    }
  }, []);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setPlaces([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

      const config: any = {
        tools: [{ googleMaps: {} }],
      };

      if (location) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config,
      });

      if (response.text) {
        setResults(response.text);
        
        // Extract places from grounding chunks
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const extractedPlaces = chunks
            .filter((chunk: any) => chunk.maps?.uri)
            .map((chunk: any) => ({
              title: chunk.maps.title || 'Unknown Place',
              uri: chunk.maps.uri,
            }));
          setPlaces(extractedPlaces);
        }
      } else {
        setError('No results found.');
      }
    } catch (err: any) {
      console.error('Error searching maps:', err);
      setError(err.message || 'An error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#1F2937] mb-2 flex items-center gap-3">
          <MapPin className="w-8 h-8 text-red-500" />
          Find Recyclers Nearby
        </h1>
        <p className="text-[#1F2937]/70">Use Google Maps data to find specialized recycling centers or kabadiwalas near you.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Where can I recycle old batteries nearby?"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query}
            className="px-8 py-4 rounded-xl bg-red-500 text-white font-bold btn-hover-effect flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search
              </>
            )}
          </button>
        </div>
        
        {location ? (
          <p className="text-xs text-emerald-600 mt-3 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Using your current location
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-3">
            Location access not granted. Results may not be localized.
          </p>
        )}
        
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">AI Response</h2>
            <div className="prose prose-sm max-w-none text-[#1F2937]/80">
              <Markdown>{results}</Markdown>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1F2937]">Places Found</h2>
            {places.length > 0 ? (
              places.map((place, index) => (
                <a
                  key={index}
                  href={place.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-4 rounded-2xl border border-black/5 shadow-sm card-hover-effect"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-[#1F2937] text-sm">{place.title}</h3>
                    <Navigation className="w-4 h-4 text-blue-500 shrink-0" />
                  </div>
                  <p className="text-xs text-blue-500 mt-2">View on Google Maps &rarr;</p>
                </a>
              ))
            ) : (
              <div className="bg-gray-50 p-4 rounded-2xl text-center text-sm text-gray-500">
                No specific places found in the response.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

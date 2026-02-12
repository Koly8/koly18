import React, { useState } from 'react';
import { Phone, MapPin, Clock, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { geoService, LocationPoint } from '../services/GeoService';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationPoint | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleCall = () => {
    window.location.href = 'tel:+74951234567';
  };

  const handleGetCoordinates = async () => {
    setLoading(true);
    try {
      const position = await geoService.collectCurrentPosition();
      setCurrentLocation(position);
      setShowLocationModal(true);
    } catch (error) {
      alert(t.locationError + ': ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendSMS = () => {
    if (currentLocation) {
      geoService.sendLocationViaSMS(currentLocation, '+74951234567', language);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            {t.title}
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 drop-shadow-md">
            {t.tagline}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-12">
          <button
            onClick={handleCall}
            className="group relative w-full lg:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 text-xl"
          >
            <Phone className="w-8 h-8 animate-pulse" />
            <span>{t.call}</span>
          </button>

          <button
            onClick={handleGetCoordinates}
            disabled={loading}
            className="group relative w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>...</span>
              </>
            ) : (
              <>
                <MapPin className="w-8 h-8" />
                <span>{t.yourCoordinates}</span>
              </>
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl py-6 px-8 shadow-2xl">
            <div className="flex items-center justify-center space-x-4">
              <Clock className="w-12 h-12 text-yellow-300" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-300">
                  {t.arrivalTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLocationModal && currentLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">{t.locationSuccess}</h3>
            <div className="space-y-3 mb-6">
              <p className="text-lg">
                <span className="font-semibold">
                  {language === 'ru' ? 'Широта' : 'Latitude'}:
                </span>{' '}
                {currentLocation.latitude.toFixed(6)}
              </p>
              <p className="text-lg">
                <span className="font-semibold">
                  {language === 'ru' ? 'Долгота' : 'Longitude'}:
                </span>{' '}
                {currentLocation.longitude.toFixed(6)}
              </p>
              <p className="text-lg">
                <span className="font-semibold">
                  {language === 'ru' ? 'Точность' : 'Accuracy'}:
                </span>{' '}
                {Math.round(currentLocation.accuracy)}m
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSendSMS}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {language === 'ru' ? 'Отправить SMS' : 'Send SMS'}
              </button>
              <a
                href={geoService.getGoogleMapsLink(currentLocation)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Google Maps
              </a>
              <button
                onClick={() => setShowLocationModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

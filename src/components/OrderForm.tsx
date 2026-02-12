import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { geoService, LocationPoint } from '../services/GeoService';
import { supabase } from '../services/supabase';

interface FormData {
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  serviceType?: string;
}

export const OrderForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    serviceType: '',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationPoint | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [mapUrl, setMapUrl] = useState<string>('');

  useEffect(() => {
    if (currentLocation) {
      const url = `https://maps.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}&output=embed`;
      setMapUrl(url);
    }
  }, [currentLocation]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.required;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.required;
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhone;
    }

    if (!formData.address.trim()) {
      newErrors.address = t.required;
    }

    if (!formData.serviceType) {
      newErrors.serviceType = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetLocation = async () => {
    setLocationLoading(true);
    try {
      const position = await geoService.collectCurrentPosition();
      setCurrentLocation(position);
    } catch (error) {
      alert(t.locationError + ': ' + (error as Error).message);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('service_requests').insert({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        service_type: formData.serviceType,
        latitude: currentLocation?.latitude || null,
        longitude: currentLocation?.longitude || null,
        accuracy: currentLocation?.accuracy || null,
        notes: formData.notes,
        status: 'pending',
      });

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        address: '',
        serviceType: '',
        notes: '',
      });
      setCurrentLocation(null);
      setMapUrl('');

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      alert(t.orderError + ': ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="order" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.orderTitle}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.address} *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.serviceType} *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.serviceType ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">{t.selectService}</option>
                  <option value="tireChange">{t.services.tireChange}</option>
                  <option value="tireRepair">{t.services.tireRepair}</option>
                  <option value="wheelBalance">{t.services.wheelBalance}</option>
                  <option value="seasonalChange">{t.services.seasonalChange}</option>
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.notes}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleGetLocation}
                disabled={locationLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {locationLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{language === 'ru' ? 'Определение...' : 'Detecting...'}</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-5 h-5" />
                    <span>{t.yourCoordinates}</span>
                  </>
                )}
              </button>

              {currentLocation && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    {language === 'ru' ? 'Координаты определены:' : 'Coordinates detected:'}{' '}
                    {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>{language === 'ru' ? 'Отправка...' : 'Sending...'}</span>
                  </>
                ) : (
                  <span>{t.submit}</span>
                )}
              </button>

              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{t.orderSuccess}</span>
                </div>
              )}
            </form>
          </div>

          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            {mapUrl ? (
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ minHeight: '500px', border: 0 }}
                loading="lazy"
                title="Location Map"
              />
            ) : (
              <div className="h-full min-h-[500px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg">
                    {language === 'ru'
                      ? 'Нажмите "Ваши координаты" для отображения карты'
                      : 'Click "Your Coordinates" to display the map'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import { supabase } from './supabase';

export interface LocationPoint {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  provider: string;
  timestamp: string;
  speed: number;
  heading: number;
}

class GeoService {
  private generateUniqueId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async getCurrentPosition(): Promise<LocationPoint> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const point: LocationPoint = {
            id: this.generateUniqueId(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy || 0,
            provider: 'gps',
            timestamp: new Date().toISOString(),
            speed: position.coords.speed || 0,
            heading: position.coords.heading || 0,
          };
          resolve(point);
        },
        (error) => {
          console.warn('[GeoService] GPS failed:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    });
  }

  async collectCurrentPosition(): Promise<LocationPoint> {
    try {
      const position = await this.getCurrentPosition();
      await this.savePoint(position);
      console.log('[GeoService] Position collected:', position);
      return position;
    } catch (error) {
      console.warn('[GeoService] Failed to collect position:', error);
      throw error;
    }
  }

  async savePoint(point: LocationPoint): Promise<void> {
    try {
      const { error } = await supabase.from('location_points').insert({
        latitude: point.latitude,
        longitude: point.longitude,
        accuracy: point.accuracy,
        provider: point.provider,
        speed: point.speed,
        heading: point.heading,
      });

      if (error) {
        console.error('[GeoService] Failed to save point:', error);
        throw error;
      }
    } catch (error) {
      console.error('[GeoService] Error saving point:', error);
      throw error;
    }
  }

  formatLocationMessage(point: LocationPoint, language: string = 'ru'): string {
    const coordinatesLabel = language === 'ru' ? 'Координаты' : 'Coordinates';
    const accuracyLabel = language === 'ru' ? 'Точность' : 'Accuracy';

    return `${coordinatesLabel}\n${point.latitude.toFixed(5)} ${point.longitude.toFixed(5)}\n${accuracyLabel}: ${Math.round(point.accuracy)} m`;
  }

  async sendLocationViaSMS(point: LocationPoint, phone: string, language: string = 'ru'): Promise<boolean> {
    try {
      const message = this.formatLocationMessage(point, language);
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      const url = `sms:${cleanPhone}?body=${encodeURIComponent(message)}`;

      window.location.href = url;
      return true;
    } catch (error) {
      console.error('[GeoService] Failed to send SMS:', error);
      return false;
    }
  }

  getGoogleMapsLink(point: LocationPoint): string {
    return `https://www.google.com/maps?q=${point.latitude},${point.longitude}`;
  }

  getYandexMapsLink(point: LocationPoint): string {
    return `https://yandex.ru/maps/?ll=${point.longitude},${point.latitude}&z=16&pt=${point.longitude},${point.latitude}`;
  }
}

export const geoService = new GeoService();

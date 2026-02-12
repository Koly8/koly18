import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.contactTitle}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">
              {language === 'ru' ? 'Телефон' : 'Phone'}
            </h3>
            <a
              href="tel:+74951234567"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              +7 (495) 123-45-67
            </a>
          </div>

          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t.email}</h3>
            <a
              href="mailto:info@tire-service.ru"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              info@tire-service.ru
            </a>
          </div>

          <div className="text-center">
            <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t.workingHours}</h3>
            <p className="text-gray-300">{t.workingHoursValue}</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">
              {language === 'ru' ? 'Зона обслуживания' : 'Service Area'}
            </h3>
            <p className="text-gray-300">
              {language === 'ru' ? 'Вся Москва и область' : 'All Moscow and region'}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {t.title}.{' '}
            {language === 'ru'
              ? 'Все права защищены.'
              : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </section>
  );
};

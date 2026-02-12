import React from 'react';
import { Settings, Wrench, CircleDot, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Settings,
      title: t.services.tireChange,
      price: t.prices.tireChange,
      color: 'bg-blue-500',
    },
    {
      icon: Wrench,
      title: t.services.tireRepair,
      price: t.prices.tireRepair,
      color: 'bg-green-500',
    },
    {
      icon: CircleDot,
      title: t.services.wheelBalance,
      price: t.prices.wheelBalance,
      color: 'bg-orange-500',
    },
    {
      icon: Calendar,
      title: t.services.seasonalChange,
      price: t.prices.seasonalChange,
      color: 'bg-purple-500',
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.servicesTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.aboutText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`${service.color} p-6 flex justify-center`}>
                <service.icon className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-2xl font-bold text-blue-600 text-center">
                  {service.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t.aboutTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                {t.language === 'ru' ? 'Быстро' : 'Fast'}
              </h4>
              <p className="text-gray-600">
                {t.language === 'ru'
                  ? 'Приезжаем в течение 15 минут'
                  : 'We arrive within 15 minutes'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                {t.language === 'ru' ? 'Профессионально' : 'Professional'}
              </h4>
              <p className="text-gray-600">
                {t.language === 'ru'
                  ? 'Опытные специалисты с оборудованием'
                  : 'Experienced specialists with equipment'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                {t.language === 'ru' ? 'Удобно' : 'Convenient'}
              </h4>
              <p className="text-gray-600">
                {t.language === 'ru'
                  ? 'Работаем по всему городу 24/7'
                  : 'We work all over the city 24/7'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Clock, MapPin } from 'lucide-react';

import React, { useState } from 'react';
import { Menu, X, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <Wrench className="w-8 h-8 text-blue-900" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{t.title}</h1>
              <p className="text-xs sm:text-sm text-blue-200">{t.tagline}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-blue-300 transition-colors"
            >
              {t.servicesTitle}
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="hover:text-blue-300 transition-colors"
            >
              {t.orderTitle}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-blue-300 transition-colors"
            >
              {t.contactTitle}
            </button>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded ${
                  language === 'ru' ? 'bg-blue-600' : 'bg-blue-800'
                } hover:bg-blue-600 transition-colors`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded ${
                  language === 'en' ? 'bg-blue-600' : 'bg-blue-800'
                } hover:bg-blue-600 transition-colors`}
              >
                EN
              </button>
            </div>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-700">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('services')}
                className="text-left hover:text-blue-300 transition-colors py-2"
              >
                {t.servicesTitle}
              </button>
              <button
                onClick={() => scrollToSection('order')}
                className="text-left hover:text-blue-300 transition-colors py-2"
              >
                {t.orderTitle}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left hover:text-blue-300 transition-colors py-2"
              >
                {t.contactTitle}
              </button>
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-3 py-1 rounded ${
                    language === 'ru' ? 'bg-blue-600' : 'bg-blue-800'
                  } hover:bg-blue-600 transition-colors`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded ${
                    language === 'en' ? 'bg-blue-600' : 'bg-blue-800'
                  } hover:bg-blue-600 transition-colors`}
                >
                  EN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

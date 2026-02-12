import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { OrderForm } from './components/OrderForm';
import { Contact } from './components/Contact';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <OrderForm />
        <Contact />
      </div>
    </LanguageProvider>
  );
}

export default App;

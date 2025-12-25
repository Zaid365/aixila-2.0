
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Services from './components/Services';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <About />
        <Process />
        <Services onOpenModal={openModal} />
        <Results />
        <Testimonials />
      </main>
      <Footer onOpenModal={openModal} />
      
      {/* Conditionally render the modal to ensure stable DOM structure */}
      {isModalOpen && <LeadModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
}

export default App;

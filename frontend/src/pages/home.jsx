import React from 'react';
//import Navbar from '../components/Navbar';
import Principal from '../sections/Principal';
import Nosotros from '../sections/Nosotros';
import Servicios from '../sections/Servicios';
import Contacto from '../sections/Contacto';
import Footer from '../sections/Footer';
import "../assets/css/Home.css"

const Home = () => {
  return (
    <div className='gradient-background'>
      <Principal />
      <Servicios />
      <Nosotros />
      <Contacto />
      <Footer />
    </div>
  );
};

export default Home;

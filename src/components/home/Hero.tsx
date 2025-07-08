import React, { useEffect } from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HEADER_HEIGHT = 72; // 4.5rem (adjust if your header is a different height)

const Hero: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-[500px] md:h-screen relative mb-10">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-no-repeat object-contain md:bg-cover md:object-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700" style={{ opacity: 0.9 }}></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex items-center justify-center pt-[72px] py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto md:mx-0">
            <h1 
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-easing="ease-out-cubic"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 md:mb-8 tracking-tight"
            >
              Find the right investors, grants, and startup support — <span className="text-blue-300">instantly.</span>
            </h1>
            
            <p 
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-easing="ease-out-cubic"
              className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 md:mb-10 max-w-2xl leading-relaxed md:leading-loose"
            >
              A curated database of 300+ real funding options tailored for Indian & global founders at every stage.
            </p>

            {/* Removed the free/login-free info bar for a cleaner look */}
            
            <Link 
              to="/auth"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-easing="ease-out-cubic"
            >
              <Button
                size="lg"
                className="group w-full sm:w-auto mt-2 md:mt-4 shadow-lg"
              >
                <Rocket size={20} className="mr-2 -rotate-[deg]" />
                Explore Now
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative element - abstract shapes */}
      <div 
        data-aos="zoom-in"
        data-aos-delay="600"
        className="hidden md:block absolute bottom-0 right-0 w-1/3 h-1/3 z-0"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-blue-400/10 w-full h-full">
          <path fill="currentColor" d="M41.3,-51.2C52.9,-42.9,60.9,-29.2,64.4,-14.2C67.9,0.7,67,17,59.8,29.1C52.6,41.3,39.1,49.4,24.7,54.9C10.4,60.3,-4.8,63.1,-18.9,59.4C-33,55.7,-46.1,45.4,-54.3,32.3C-62.5,19.1,-65.9,3,-62,-10.8C-58.1,-24.5,-47,-35.9,-34.9,-44.4C-22.8,-52.9,-9.9,-58.6,3,-62.2C15.9,-65.7,29.7,-59.4,41.3,-51.2Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
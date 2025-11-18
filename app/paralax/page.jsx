'use client'
import { useEffect, useRef } from 'react';
import Head from 'next/head';

export default function DramaticParallaxPage() {
  const mountainRef = useRef(null);
  const cloudsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      // More dramatic speed difference
      const mountainSpeed = scrolled * -0.2;  // Very slow - distant mountains
      const cloudSpeed = scrolled * -0.8;     // Fast - close clouds
      
      if (mountainRef.current) {
        mountainRef.current.style.transform = `translate3d(0, ${mountainSpeed}px, 0)`;
      }
      if (cloudsRef.current) {
        cloudsRef.current.style.transform = `translate3d(0, ${cloudSpeed}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900">
      <Head>
        <title>Mountain & Clouds Parallax</title>
      </Head>

      {/* Parallax Background Layers */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Distant Mountains - Slowest */}
        <div 
          ref={mountainRef}
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Clouds - Fastest */}
        <div 
          ref={cloudsRef}
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-purple-900/30 to-indigo-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Sky High
            </h1>
            <p className="text-2xl md:text-3xl mb-8">
              Mountains and clouds moving at different parallax speeds
            </p>
          </div>
        </section>

        {[1, 2, 3, 4].map((section) => (
          <section 
            key={section}
            className="min-h-screen flex items-center justify-center px-8 bg-black/20 backdrop-blur-sm"
          >
            <div className="text-center text-white max-w-4xl">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Altitude {section}
              </h2>
              <p className="text-xl md:text-2xl">
                Watch the clouds move faster than the mountains
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
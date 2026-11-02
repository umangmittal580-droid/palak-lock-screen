
import { useEffect, useState } from 'react';

export default function MemoryFlixIntro({ onComplete }) {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 1300);

    const finishTimer = setTimeout(() => {
      onComplete?.();
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <main className="memoryflix-intro">

      <div className="intro-center">

        <div className="netflix-n">N</div>

        {showLogo && (
          <div className="memoryflix-logo">
            MEMORY<span>FLIX</span>
          </div>
        )}

        <p className="intro-tagline">
          A WORLD OF MEMORIES AWAITS...
        </p>

        <div className="intro-loader">
          <div className="intro-loader-fill"></div>
        </div>

      </div>

    </main>
  );
}

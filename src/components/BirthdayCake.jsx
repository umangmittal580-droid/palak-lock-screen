
import React from 'react';
import { useEffect, useState } from 'react';
import MemoryFlixIntro from './MemoryFlixIntro';
import MemoryFlixProfiles from './MemoryFlixProfiles';
import MemoryFlixHome from './MemoryFlixHome';
export default function BirthdayCake() {
  const [showJourney, setShowJourney] = useState(false);
const [showMemoryFlixIntro, setShowMemoryFlixIntro] = useState(false);

  const [stage, setStage] = useState('ready');
  const [candlesOut, setCandlesOut] = useState(0);
  const [musicStopped, setMusicStopped] = useState(false);
  
  const [showProfileScreen, setShowProfileScreen] = useState(false);
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  useEffect(() => {
    if (stage !== 'blowing') return;

    if (candlesOut < 5) {
      const timer = setTimeout(() => {
        setCandlesOut((count) => count + 1);
      }, 450);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setStage('cutting'), 500);
    return () => clearTimeout(timer);
  }, [stage, candlesOut]);

  useEffect(() => {
    if (stage !== 'cutting') return;

    const timer = setTimeout(() => setStage('finished'), 2400);
    return () => clearTimeout(timer);
  }, [stage]);

  const cutCake = () => {
  if (stage !== 'ready') return;
  setStage('blowing');
};
if (showHomeScreen) {
  return <MemoryFlixHome />;
}
if (showProfileScreen) {
  return (
    <MemoryFlixProfiles
      onSelect={(profileName) => {
        console.log('Selected profile:', profileName);
        setShowProfileScreen(false);
        setShowHomeScreen(true);
      }}
    />
  );
}

if (showMemoryFlixIntro) {
  return (
    <MemoryFlixIntro
      onComplete={() => {
        setShowMemoryFlixIntro(false);
        setShowProfileScreen(true);
      }}
    />
  );
}

return (
    <main className="cake-page">
      <style>{`
        .cake-page {
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          background:
            radial-gradient(ellipse at 50% 75%, #54202d 0%, #17090e 48%, #050405 100%);
          color: white;
          font-family: Georgia, serif;
          text-align: center;
          padding: 35px 18px 55px;
        }

        .cake-lights {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
          padding: 12px 0 35px;
          border-bottom: 1px solid #b88945;
          border-radius: 0 0 50% 50%;
          pointer-events: none;
        }

        .cake-lights span {
          width: 9px;
          height: 9px;
          background: #ffd78b;
          border-radius: 50%;
          box-shadow: 0 0 10px 4px #ffbd54;
          animation: twinkle 1.5s infinite alternate;
        }

        @keyframes twinkle {
          from { opacity: .45; box-shadow: 0 0 5px #ffbd54; }
          to { opacity: 1; box-shadow: 0 0 18px 6px #ffbd54; }
        }

        .cake-heading {
          position: relative;
          z-index: 1;
          margin: 45px auto 15px;
        }

        .cake-crown {
          color: #ffd27a;
          font-size: 48px;
          text-shadow: 0 0 20px #ffbd54;
        }

        .cake-heading h1 {
          font-size: clamp(32px, 6vw, 65px);
          line-height: 1.2;
          margin: 12px 0;
          color: #ffdce9;
          text-shadow: 0 0 20px #ff76a8;
        }

        .cake-heading h1 span {
          display: block;
          color: #ff8db7;
          font-style: italic;
        }

        .cake-subtitle {
          color: #f8d9c9;
          font-size: clamp(14px, 2.5vw, 22px);
          letter-spacing: 2px;
        }

        .cake-decor {
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 10px;
          max-width: 850px;
          margin: 30px auto 0;
          min-height: 300px;
        }

        .cake-side {
          font-size: clamp(38px, 7vw, 75px);
          display: flex;
          flex-direction: column;
          gap: 28px;
          filter: drop-shadow(0 0 12px #ff9caa);
        }

        .cake-center {
          flex: 1;
          min-width: 180px;
          max-width: 440px;
        }

        .candles {
          display: flex;
          justify-content: center;
          gap: 24px;
          height: 95px;
          align-items: end;
        }

        .candle {
          width: 12px;
          height: 65px;
          border-radius: 4px;
          background: repeating-linear-gradient(
            135deg, #fff0df 0 7px, #ff8ba8 7px 13px
          );
          position: relative;
          box-shadow: 0 0 10px #ffb45c;
        }

        .flame {
          position: absolute;
          top: -28px;
          left: 1px;
          width: 10px;
          height: 22px;
          border-radius: 50% 50% 45% 45%;
          background: #ffb52e;
          box-shadow: 0 0 18px 7px #ff8b22;
          animation: flicker .5s infinite alternate;
        }

        @keyframes flicker {
          from { transform: rotate(-7deg) scale(.9); }
          to { transform: rotate(7deg) scale(1.1); }
        }

        .cake-top {
          background: #ffd3dc;
          color: #67243d;
          border-radius: 50% 50% 12px 12px;
          padding: 18px 8px;
          font-size: clamp(17px, 3vw, 26px);
          font-weight: bold;
          border-bottom: 9px solid #f08eaa;
          box-shadow: 0 0 25px #ff8eaf;
        }

        .cake-middle {
          height: 65px;
          margin: auto;
          width: 90%;
          background: linear-gradient(#ffb5c8, #f47e9e);
          border-radius: 0 0 18px 18px;
          border-bottom: 8px solid #c95078;
        }

        .cake-bottom {
          height: 45px;
          margin: auto;
          width: 75%;
          background: linear-gradient(#e99b70, #b96b51);
          border-radius: 0 0 18px 18px;
        }

        .cake-button {
          margin-top: 42px;
          padding: 17px 42px;
          border: 2px solid #ff9fca;
          border-radius: 50px;
          background: linear-gradient(90deg, #711d3d, #c13b70, #711d3d);
          color: white;
          font-size: 19px;
          font-weight: bold;
          letter-spacing: 2px;
          box-shadow: 0 0 20px #ff4f91, inset 0 0 12px #ff9fca;
          cursor: pointer;
        }

        .cake-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 32px #ff4f91;
        }

        @media (max-width: 600px) {
          .cake-page { padding: 25px 12px 45px; }
          .cake-decor { min-height: 250px; }
          .cake-side { font-size: 36px; }
          .candles { gap: 13px; }
          .candle { height: 52px; }
          .cake-button { padding: 15px 25px; font-size: 15px; }
        }
      `}</style>

      <div className="cake-lights">
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.13}s` }} />
        ))}
      </div>

      <header className="cake-heading">
        <div className="cake-crown">♕</div>
        <h1>
          It's Your
          <span>Virtual Birthday Celebration!</span>
        </h1>
        <p className="cake-subtitle">
          Let's cut the cake and make a wish... ♡
        </p>
      </header>

      <section className="cake-decor">
        <div className="cake-side">
          <span>💐</span>
          <span>🎁</span>
        </div>

<div className={`cake-center ${stage === 'finished' ? 'cake-cut-done' : ''}`}>

  {stage === 'cutting' && (
    <div className="cake-knife">🔪</div>
  )}          <div className="candles">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="candle" key={i}>
  {i >= candlesOut && <span className="flame" />}
  {i < candlesOut && <span className="candle-smoke">〰</span>}
</div>
            ))}
          </div>

          <div className="cake-top">
            Happy Birthday<br />Palak ♡
          </div>
          <div className="cake-middle" />
          <div className="cake-bottom" />
        </div>

        <div className="cake-side">
          <span>🧸</span>
          <span>⭐</span>
        </div>
      </section>

      {stage !== 'finished' ? (
  <button
    className="cake-button"
    onClick={cutCake}
    disabled={stage !== 'ready'}
  >
    {stage === 'ready'
      ? '🎂 CUT THE CAKE ♡'
      : stage === 'blowing'
      ? '🕯️ MAKING A WISH...'
      : '🔪 CUTTING THE CAKE...'}
  </button>
) : (
  <div className="cake-final-wish">
    <div className="cake-confetti">
      {Array.from({ length: 35 }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 10) * 0.15}s`,
            color: ['#ff87b6', '#ffd36e', '#a7e9ff', '#ffffff'][i % 4]
          }}
        >
          {i % 3 === 0 ? '♥' : '✦'}
        </span>
      ))}
    </div>

    <h2>Happy Birthday, Palak! ♡</h2>
    <p>
      May all your wishes come true, birthday girl! ✨
    </p>
    <p>Keep smiling, because your smile makes everything brighter. 💗</p>
    </div>
)}

{/* MEMORY JOURNEY BUTTON */}
{stage === 'finished' && !showJourney && (
  <button
    className="journey-unlock-button"
    onClick={() => setShowJourney(true)}
  >
    ✨ SURPRISES AREN'T OVER YET ♡
  </button>
)}

{/* MEMORY JOURNEY TICKET SCREEN */}
{showJourney && (
  <section className="memory-journey-screen">

    <div className="journey-decoration">
      ✦　✧　✦
    </div>

    <div className="journey-heading">
      <span>✈</span>
      <h2>Are You Ready to Travel</h2>
      <h1>Through Your Memories? ♡</h1>
    </div>

    <div className="journey-ticket">
      <div className="ticket-plane">✈</div>
      <div className="ticket-heart">♡</div>

      <p>YOUR</p>
      <h2>MEMORY JOURNEY</h2>
      <span>A TRIP THROUGH YOUR LIFE ♡</span>
    </div>

    <button
      className="start-journey-button"
      onClick={() => setShowMemoryFlixIntro(true)}
      
    >
      ✈ LET'S START THE JOURNEY ♡
    </button>

  </section>
)}
<button
  className="stop-music-button"
  onClick={() => {
    window.dispatchEvent(new Event('stop-birthday-music'));
    setMusicStopped(true);
  }}
>
  {musicStopped ? '🔇 MUSIC STOPPED' : '🔊 STOP THE MUSIC'}
</button>
    </main>
  );
}

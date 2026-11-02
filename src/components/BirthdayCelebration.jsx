import { useEffect, useRef, useState } from 'react';import { Sparkles, Heart } from 'lucide-react';
import BirthdayCake from './BirthdayCake';
export default function BirthdayCelebration() {
  const [started, setStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const [showCakePage, setShowCakePage] = useState(false);
const audioRef = useRef(null);

useEffect(() => {
  const audio = new Audio('/audio/birthday.mp3');

  audio.loop = true;
  audio.volume = 0.5;

  audioRef.current = audio;

  return () => {
    audio.pause();
    audioRef.current = null;
  };
}, []);
useEffect(() => {
  const stopBirthdayMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setMusicOn(false);
  };

  window.addEventListener('stop-birthday-music', stopBirthdayMusic);

  return () => {
    window.removeEventListener('stop-birthday-music', stopBirthdayMusic);
  };
}, []);

const toggleMusic = async () => {
  if (!audioRef.current) return;

  if (musicOn) {
    audioRef.current.pause();
    setMusicOn(false);
  } else {
    try {
      await audioRef.current.play();
      setMusicOn(true);
      setShowBalloons(true);
    } catch (error) {
      console.error('Music could not be played:', error);
    }
  }
};
  const [lightsOn, setLightsOn] = useState(false);
if (showCakePage) {
  return <BirthdayCake />;
}
  return (
    <main className="birthday-room">

      {!started ? (
  <section className="welcome-scene new-welcome">

    {/* TOP FAIRY LIGHTS */}
    <div className="fairy-wire fairy-wire-left">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} style={{ '--i': i }} />
      ))}
    </div>

    <div className="fairy-wire fairy-wire-right">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} style={{ '--i': i }} />
      ))}
    </div>

    {/* LEFT POLAROIDS */}
    <div className="polaroid polaroid-one">
      <img src="/images/palak-photo-1.jpg" alt="Palak" />
      <span className="photo-tape" />
      <span className="photo-heart">♡</span>
    </div>

    <div className="polaroid polaroid-two">
      <img src="/images/palak-photo-2.jpg" alt="Palak" />
      <span className="photo-tape" />
    </div>

    {/* RIGHT POLAROIDS */}
    <div className="polaroid polaroid-three">
      <img src="/images/palak-photo-3.jpg" alt="Palak" />
      <span className="photo-tape" />
    </div>

    <div className="polaroid polaroid-four">
      <img src="/images/palak-photo-4.jpg" alt="Palak" />
      <span className="photo-tape" />
      <span className="photo-heart">♡</span>
    </div>

    {/* CENTER CONTENT */}
    <div className="welcome-content new-welcome-content">

      <div className="welcome-crown">♛</div>

      <div className="welcome-stars">
        ✦　✧　✦　✧　✦
      </div>

      <p className="welcome-eyebrow">
        A LITTLE WORLD MADE WITH LOVE
      </p>

      <h1 className="welcome-main-title">
        A Special
        <span>Birthday Surprise</span>
      </h1>

      <p className="welcome-subtitle">
        JUST FOR YOU, PALAK ♡
      </p>

      <button
        className="begin-button new-begin-button"
        onClick={() => setStarted(true)}
      >
        LET'S BEGIN ♡
      </button>

    </div>

    {/* BOTTOM GIFT */}
    <div className="welcome-gift">
      <span>♡</span>
      <div className="gift-box">
        <div className="gift-ribbon" />
      </div>
    </div>

    <div className="welcome-bottom-glow" />

  </section>
) : (
        <section className={`lights-scene ${lightsOn ? 'room-lit' : ''}`}>

  <div className="lights-content">

    {!lightsOn ? (
      <>
        <span className="lights-icon">✨</span>

        <h1>
          It's a little dark in here...
        </h1>

        <p>
          Let's make this place special for you!
        </p>

        <button
          className="lights-button"
          onClick={() => setLightsOn(true)}
        >
          💡 TURN ON THE LIGHTS
        </button>
      </>
    ) : (
      <div className="birthday-reveal">

        <div className="fairy-lights">
          ✦　✨　✦　✨　✦
        </div>

        <span className="birthday-crown">👑</span>

        <p className="reveal-small">
          TODAY IS ALL ABOUT YOU
        </p>

        <h1>
          HAPPY BIRTHDAY
          <br />
          GIRL! ♡
        </h1>

        <p className="reveal-message">
          Let the celebration begin, Palak!
        </p>

      <button
  className="lights-button music-control"
  onClick={toggleMusic}
>
  {musicOn ? '⏸ PAUSE THE MUSIC' : '🎵 PLAY THE MUSIC'}
</button>

{showBalloons && (
  <div className="balloon-celebration">

    <div className="birthday-banner">
      HAPPY BIRTHDAY PALAK ♡
    </div>

    <div className="balloon-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <span
          className="flying-balloon"
          key={i}
          style={{
'--left': `${
  i < 25
    ? 2 + ((i * 19) % 47)
    : 51 + ((i * 19) % 47)
}%`,
            '--delay': `${(i % 9) * 0.2}s`,
            '--duration': `${7 + (i % 6)}s`,
            '--drift': `${((i % 9) - 4) * 100}px`,
            '--size': `${35 + (i % 4) * 12}px`
          }}
        >
          🎈
        </span>
      ))}
    </div>

    {!showSpecialMessage ? (
      <>
        <div className="celebration-message">
          Let the birthday magic begin! ✨
        </div>

        <button
          className="candle-next-button"
          onClick={() => setShowSpecialMessage(true)}
        >
          🕯️ LIGHT THE CANDLES
        </button>
      </>
    ) : (
      <div className="special-message-screen">

        <div className="golden-sparkles">
          ✨　✦　✨　✧　✨
        </div>

        <p className="special-small">
          A LITTLE SOMETHING JUST FOR YOU
        </p>

        <h1>
          A SPECIAL
          <br />
          MESSAGE FOR YOU
        </h1>

        <h2>PALAK ♡</h2>

        <div className="letter-content">

  <h2>A Little Letter For You, Palak ♡</h2>

  <p>Hey Birthday Girl,</p>

  <p>
    I honestly don't know where to start, but I just wanted
    to write something for you.
  </p>

  <p>
    You know, sometimes it's the little things that make
    someone special. Your smile, our random talks, your
    silly moments and all those little things about you.
    They might seem ordinary to you, but they really do
    make you special.
  </p>

  <p>
    I don't know if I always express things properly, but
    I hope you know that you mean a lot. And if I can make
    you smile, even on an ordinary day, that's something
    I'll always be happy about.
  </p>

  <p>
    On your birthday, I just wish you all the happiness
    in the world. I hope you get everything you've been
    wishing for, make beautiful memories, achieve your
    dreams and always have reasons to smile.
  </p>

  <p>
    Just stay the way you are. Keep smiling, keep being
    a little crazy, and never lose that beautiful side
    of yourself.
  </p>

  <p>And before you go...</p>

  <p>
    I made this little website just for you. It may be
    just a few pages on a screen, but there's a little
    effort, thought and feeling behind every part of it.
    I hope whenever you look back at it, it brings a
    smile to your face.
  </p>

  <p>Happy Birthday once again, Palak. ❤️</p>

  <p>
    Take care of yourself and keep smiling. You deserve
    all the good things in life. ♡
  </p>


</div>
        <button
  className="surprise-button"
  onClick={() => setShowCakePage(true)}
>
  OPEN YOUR SURPRISE ♡
</button>
      </div>
    )}

  </div>
)}

         </div>)}

      </div>

    </section>

      )}

    </main>
  );
}
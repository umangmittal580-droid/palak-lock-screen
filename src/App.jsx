

import { useEffect, useRef, useState } from 'react';
import BirthdayCelebration from './components/BirthdayCelebration';
import {
  Heart,
  LockKeyhole,
  Star,
  Lightbulb,
  Delete,
  Sparkles,
  Music2,
  VolumeX
} from 'lucide-react';

const PASSCODE = '0103';

export default function App() {
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  const audioRef = useRef(null);

  // Birthday music setup
  useEffect(() => {
    const audio = new Audio('/audio/birthday.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
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
      } catch(error) {
        setMessage('Please check your birthday music file! 🎵');
      }
    }
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => setMessage(''), 2600);
    return () => clearTimeout(timer);
  }, [message]);

  const press = (value) => {
    if (unlocked) return;

    if (value === 'clear') {
      setCode('');
      setMessage('');
      return;
    }

    if (value === 'back') {
      setCode((old) => old.slice(0, -1));
      return;
    }

    if (code.length < 4) {
      setCode((old) => old + value);
    }
  };

  const unlock = () => {
    if (code.length !== 4) {
      setMessage('Four little numbers, Palak! 🤭');
      return;
    }

    if (code === PASSCODE) {
      setUnlocked(true);
      setMessage('You got it, Birthday Girl! ♡');
      return;
    }

    setAttempts((n) => n + 1);
    setShake(true);
    setTimeout(() => setShake(false), 520);
    setCode('');

    const next = attempts + 1;

    setMessage(
      next === 1
        ? 'Oops! Try that little guess again ♡'
        : next === 2
        ? 'Palakkk, think a little harder! 🤭'
        : next === 3
        ? 'Hint is right there, birthday girl!'
        : 'It is a very special time… ⏰'
    );
  };

  const keys = ['1','2','3','4','5','6','7','8','9','*','0','#'];
if (unlocked) {
  return <BirthdayCelebration />;
}
  return (
    <main className="page-shell">

      {/* Floating birthday decorations */}
      <div className="floating-decorations" aria-hidden="true">
        <span className="balloon">🎈</span>
        <span className="balloon">🎀</span>
        <span className="balloon">🎈</span>
        <span className="balloon">💗</span>

        <span className="floating-heart">♥</span>
        <span className="floating-heart">♡</span>
        <span className="floating-heart">♥</span>

        <span className="floating-sparkle">✦</span>
        <span className="floating-sparkle">✧</span>
        <span className="floating-sparkle">✨</span>
      </div>

      {/* Music button */}
      <button
        className="music-button"
        onClick={toggleMusic}
        aria-label={musicOn ? 'Pause music' : 'Play music'}
      >
        {musicOn ? <VolumeX size={18} /> : <Music2 size={18} />}
        {musicOn ? 'Pause Music' : 'Play Birthday Music'}
        <Heart size={15} fill="currentColor" />
      </button>

      <div className="browser-card">

        <header className="browser-bar">
          <div className="traffic-lights">
            <i /><i /><i />
          </div>

          <div className="address-pill">
            <LockKeyhole size={15} fill="currentColor" />
            <span>A Special Surprise Awaits...</span>
            <Heart size={17} fill="currentColor" />
          </div>

          <div className="bar-icons">
            <Star />
            <Heart />
          </div>
        </header>

        <section className="lock-layout">

          <div className="memory-side">
            <div className="stripe-wash" />

            <div className="note note-top">
              <span className="tape" />
              <span className="note-script">
                Hey<br />
                <b>Palak,</b><br />
                Birthday Girl! <em>♡</em>
              </span>
            </div>

            <div className="portrait-wrap">
              <div className="flower-frame">
                <img
                  src="/images/palak-photo.jpg"
                  alt="Palak"
                  className="portrait"
                />
              </div>

              <span className="flower flower-one">✿</span>
              <span className="flower flower-two">✿</span>
              <span className="heart-sticker">♥</span>
            </div>

            <div className="note note-lower">
              <span className="clip">⌁</span>
              <span>
                You make<br />
                my world<br />
                so much<br />
                brighter <b>♡</b>
              </span>
            </div>

            <div className="bottom-quote">
              “A little surprise is waiting for you...”
              <Heart size={19} />
            </div>

            <span className="doodle d1">♡</span>
            <span className="doodle d2">✦</span>
            <span className="doodle d3">★</span>
            <span className="doodle d4">✧</span>
          </div>

          <div className="keypad-side">

            <span className="sparkle s1">✦</span>
            <span className="sparkle s2">♡</span>
            <span className="sparkle s3">✧</span>

            {!unlocked ? (
              <>
                <div className="form-heading">
                  <h1>Enter the Passcode</h1>
                  <p>
                    to unlock your Birthday Surprise
                    <Heart size={16} />
                  </p>
                </div>

                <div
                  className={`pin-row ${shake ? 'shake' : ''}`}
                  aria-label="Passcode digits"
                >
                  {[0,1,2,3].map((i) => (
                    <div
                      className={`pin-box ${code[i] ? 'filled' : ''}`}
                      key={i}
                    >
                      {code[i] || (
                        <Star
                          size={20}
                          fill="#ffd58b"
                          stroke="#f5b75e"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="keypad">
                  {keys.map((key) => (
                    <button
                      key={key}
                      className="key"
                      onClick={() =>
                        key === '*' || key === '#'
                          ? press('back')
                          : press(key)
                      }
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <div className="action-row">
                  <button className="unlock-btn" onClick={unlock}>
                    <LockKeyhole size={18} />
                    UNLOCK
                    <Heart size={17} fill="currentColor" />
                  </button>

                  <button
                    className="clear-btn"
                    onClick={() => press('clear')}
                    aria-label="Clear passcode"
                  >
                    <Delete size={17} />
                  </button>
                </div>

                <div className="hint-card">
                  <div className="bulb">
                    <Lightbulb size={26} />
                  </div>

                  <div>
                    <strong>Hint:</strong>
                    <p>
                      The time when the world got a little more beautiful ♡
                    </p>
                    <b className="think">Now think, Palak!</b>
                  </div>
                </div>

                <div className="feedback" aria-live="polite">
                  {message}
                </div>
              </>
            ) : (
              <div className="success-panel">
                <div className="success-heart">
                  <Heart size={48} fill="currentColor" />
                </div>

                <p className="eyebrow">ACCESS GRANTED</p>
                <h1>You did it, Palak!</h1>

                <p>
                  Your little birthday world is waiting for you. ♡
                </p>

                <div className="confetti-line">
                  ✦　♡　✧　♥　✦
                </div>

                <button
                  className="unlock-btn continue-btn"
                  onClick={() =>
                    setMessage('Birthday reveal is the next page we will connect! ♡')
                  }
                >
                  LET THE MAGIC BEGIN
                  <Sparkles size={18} />
                </button>

                <small>{message}</small>
              </div>
            )}

          </div>
        </section>
      </div>

      <footer className="footer-note">
        made with a little extra love, just for Palak
        <Heart size={13} fill="currentColor" />
      </footer>
    </main>
  );
}

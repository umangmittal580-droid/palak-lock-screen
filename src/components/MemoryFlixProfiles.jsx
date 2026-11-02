
import './MemoryFlixProfiles.css';

const profiles = [
  { name: 'Palak ♡', type: 'photo', image: '/images/palak-photo.jpg' },
  { name: 'Family ♡', type: 'emoji', emoji: '☁️' },
  { name: 'Us ♡', type: 'emoji', emoji: '🍿' },
  { name: 'Add Profile', type: 'emoji', emoji: '+' }
];

export default function MemoryFlixProfiles({ onSelect }) {
  return (
    <main className="profiles-screen">
      <header className="profiles-header">
        <div className="profiles-logo">
          MEMORY<span>FLIX</span>
        </div>
      </header>

      <section className="profiles-content">
        <h1>Who's Watching?</h1>
        <p className="profiles-subtitle">
          Choose your little world of memories ♡
        </p>

        <div className="profiles-list">
          {profiles.map((profile) => (
            <button
              className="profile-card"
              key={profile.name}
onClick={() => onSelect(profile.name)}            >
              <div className={`profile-image-wrap ${profile.type}`}>
                {profile.type === 'photo' ? (
                  <img
                    src={profile.image}
                    alt="Palak"
                    className="profile-image"
                  />
                ) : (
                  <span className="profile-emoji">
                    {profile.emoji}
                  </span>
                )}
              </div>

              <span className="profile-name">
                {profile.name}
              </span>
            </button>
          ))}
        </div>

        <p className="profiles-footer">
          A special little world, made just for you.
        </p>
      </section>
    </main>
  );
}

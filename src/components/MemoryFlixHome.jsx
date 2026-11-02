
import React, { useState } from 'react';
import './MemoryFlixHome.css';

// Automatically load all photos from src/assets/palak
const photoFiles = import.meta.glob('../assets/palak/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const allPhotos = Object.entries(photoFiles)
  .map(([path, src]) => ({
    name: path.split('/').pop(),
    src
  }))
  .sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );

const collections = [
  {
    id: 'childhood',
    title: 'Childhood Memories 🧸',
    subtitle: 'Little moments from her childhood',
    prefix: 'childhood-',
    emoji: '🎀'
  },
  {
    id: 'pretty',
    title: 'Pretty Little Things 🌸',
    subtitle: 'Every picture has its own beauty',
    prefix: 'pretty-',
    emoji: '🌸'
  },
  {
    id: 'pagalpanti',
    title: 'No Filter, Just Pagalpanti 😂',
    subtitle: 'Funny faces and unforgettable madness',
    prefix: 'pagalpanti-',
    emoji: '😂'
  },
  {
    id: 'moments',
    title: 'Little Moments, Big Memories 💗',
    subtitle: 'A collection waiting for its memories',
    prefix: 'moments-',
    emoji: '💗',
    comingSoon: true
  }
];

export default function MemoryFlixHome() {
  const [activeTab, setActiveTab] = useState('Home');
  const [addedToList, setAddedToList] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const getPhotos = (prefix) => {
    return allPhotos.filter((photo) =>
      photo.name.toLowerCase().startsWith(prefix)
    );
  };

  const scrollToCollection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleTab = (tab) => {
    setActiveTab(tab);

    if (tab === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'Series') {
      scrollToCollection('childhood');
    } else if (tab === 'Movies') {
      scrollToCollection('pretty');
    } else if (tab === 'My List') {
      setAddedToList(true);
      scrollToCollection('moments');
    }
  };

  return (
    <main className="memoryflix-home">

      {/* NAVBAR */}
      <nav className="mf-navbar">
        <div className="mf-logo">
          MEMORY<span>FLIX</span>
        </div>

        <div className="mf-nav-links">
          {['Home', 'Series', 'Movies', 'My List'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => handleTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mf-nav-right">
          <button
            className="mf-search"
            onClick={() => scrollToCollection('childhood')}
            aria-label="Go to memories"
          >
            ⌕
          </button>
          <div className="mf-avatar">♡</div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="mf-hero">
        <div className="mf-hero-image">
          <img src="/images/palak-photo.jpg" alt="Palak" />
        </div>

        <div className="mf-hero-content">
          <p className="mf-kicker">
            M E M O R Y <span>S E R I E S</span>
          </p>

          <h1>
            The
            <span>Palak</span>
            <span>Story ♡</span>
          </h1>

          <p className="mf-description">
            A beautiful journey of Palak's life —
            from a little girl to the amazing person
            she is today.
          </p>

          <div className="mf-actions">
            <button
              className="mf-play"
              onClick={() => {
                setPlaying(true);
                scrollToCollection('childhood');
              }}
            >
              ▶ Play Memories
            </button>

            <button
              className="mf-list"
              onClick={() => setAddedToList(!addedToList)}
            >
              {addedToList ? '✓ Added to My List' : '+ My List'}
            </button>
          </div>

          {playing && (
            <p className="mf-playing-message">
              ♡ Your memory journey is ready...
            </p>
          )}
        </div>
      </section>

      {/* MEMORY COLLECTIONS */}
      <div className="mf-collections">

        {collections.map((collection) => {
          const photos = getPhotos(collection.prefix);

          return (
            <section
              className="mf-collection"
              id={collection.id}
              key={collection.id}
            >
              <div className="mf-collection-heading">
                <div>
                  <h2>{collection.title}</h2>
                  <p>{collection.subtitle}</p>
                </div>

                {!collection.comingSoon && (
                  <span className="mf-photo-count">
                    {photos.length} Photos
                  </span>
                )}
              </div>

              {collection.comingSoon ? (
                <div className="mf-coming-soon">
                  <span>♡</span>
                  <h3>Coming Soon</h3>
                  <p>More beautiful memories are waiting to be added...</p>
                </div>
              ) : photos.length > 0 ? (
                <div className="mf-photo-row">
                  {photos.map((photo, index) => (
                    <button
                      className="mf-photo-card"
                      key={photo.name}
                      onClick={() => setSelectedPhoto({
                        ...photo,
                        collection: collection.title
                      })}
                    >
                      <div className="mf-photo-image">
                        <img
                          src={photo.src}
                          alt={`Palak memory ${index + 1}`}
                          loading="lazy"
                        />
                        <span>{collection.emoji}</span>
                      </div>
                      <p>Memory {index + 1}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mf-empty">
                  No photos added yet ♡
                </div>
              )}
            </section>
          );
        })}

      </div>

      {/* FULL SCREEN PHOTO VIEWER */}
      {selectedPhoto && (
        <div
          className="mf-lightbox"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="mf-lightbox-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo"
          >
            ×
          </button>

          <div
            className="mf-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedPhoto.src} alt={selectedPhoto.name} />
            <p>{selectedPhoto.collection} ♡</p>
          </div>
        </div>
      )}

      <footer className="mf-footer">
        Made with love, just for Palak ♡
      </footer>

    </main>
  );
}

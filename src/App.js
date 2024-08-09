import React, { useState, useEffect } from 'react';
import MusicPlayer from './components/MusicPlayer';
import SongList from './components/SongList';
import './App.css';
import './index.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState('For You');
  const [backgroundColor, setBackgroundColor] = useState('#f4f4f4'); 

  useEffect(() => {
    fetch('https://cms.samespace.com/items/songs')
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.data);
        if (data.data.length > 0) {
          setCurrentSong(data.data[0]);
          setBackgroundColor(data.data[0].accent); 
        }
      });
  }, []);

  useEffect(() => {
    if (currentSong) {
      setBackgroundColor(currentSong.accent); 
    }
  }, [currentSong]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="tab-container">
        <button onClick={() => handleTabChange('For You')}>For You</button>
        <button onClick={() => handleTabChange('Top Tracks')}>Top Tracks</button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="search-input"
      />
      <div className="content">
        <div className="song-list-container">
          <SongList songs={filteredSongs} onSelect={setCurrentSong} />
        </div>
        <div className="music-player-container">
          <MusicPlayer
            song={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

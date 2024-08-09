import React from 'react';
import './SongCard.css';

function SongCard({ song, onSelect }) {
  return (
    <div className="SongCard" onClick={onSelect}>
      <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="cover-image" />
      <div className="song-info">
        <h3 className="song-name">{song.name}</h3>
        <p className="song-artist">{song.artist}</p>
        <p className="song-duration">{song.duration}</p>
      </div>
    </div>
  );
}

export default SongCard;

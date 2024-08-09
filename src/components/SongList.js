import React from 'react';
import SongCard from './SongCard';
import './SongList.css';

function SongList({ songs, onSelect }) {
  return (
    <div className="SongList">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} onSelect={() => onSelect(song)} />
      ))}
    </div>
  );
}

export default SongList;

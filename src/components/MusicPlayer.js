import React, { useRef, useEffect } from 'react';
import './MusicPlayer.css';

function MusicPlayer({ song, isPlaying, onPlayPause, onNext, onPrevious }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song ? `https://pub-172b4845a7e24a16956308706aaf24c2.r2.dev/${song.url.split('/').pop()}` : '';
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [song]);

  return (
    <div className="MusicPlayer" style={{ backgroundColor: song ? song.accent : '#fff' }}>
      {song && (
        <>
          <div className="song-info">
            <h2 className="song-name">{song.name}</h2>
            <p className="song-artist">{song.artist}</p>
          </div>
          <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="cover-image3" />
          <div className="controls">
            <button className="previous-button" onClick={onPrevious}>⏮</button>
            <button className="play-button" onClick={onPlayPause}>{isPlaying ? '⏸' : '▶️'}</button>
            <button className="next-button" onClick={onNext}>⏭</button>
          </div>
          <audio ref={audioRef} controls />
        </>
      )}
    </div>
  );
}

export default MusicPlayer;

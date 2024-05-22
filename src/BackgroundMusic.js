import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(new Audio('/background-music.mp3'));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    const playAudio = () => {
      audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('mousemove', playAudio);
    };

    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    document.addEventListener('mousemove', playAudio);

    return () => {
      audio.pause();
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('mousemove', playAudio);
    };
  }, []);

  return null;
};

export default BackgroundMusic;

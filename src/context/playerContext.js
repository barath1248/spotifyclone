import React, { createContext, useRef, useState, useEffect } from 'react';
import { songsData } from '../assets/assets';

export const playerContext = createContext();

export const PlayerContextProvider = (props) => {
  const audioref = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[5]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    Totaltime: {
      second: 0,
      minute: 0,
    },
  });

  

   

  const play = () => {
    if (audioref.current) {
      audioref.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioref.current) {
      audioref.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioref.current.play();
    setPlayStatus(true);
  };

  const previous = async (id) => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioref.current.play();
      setPlayStatus(true);
    }
  };
  
  const next= async (id) => {
    if (track.id <songsData.length-1) {
      await setTrack(songsData[track.id +1]);
      await audioref.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong= async(e)=>{
    audioref.current.currentTime=((e.nativeEvent.offsetX/ seekBg.current.offsetWidth)*audioref.current.duration)
  }

  useEffect(() => {
    const updateTime = () => {
      if (audioref.current) {
        const currentTime = audioref.current.currentTime;
        const duration = audioref.current.duration;
        const progress = (currentTime / duration) * 100;

        if (seekBar.current) {
          seekBar.current.style.width = `${progress}%`;
        }

        setTime({
          currentTime: {
            second: Math.floor(currentTime % 60),
            minute: Math.floor(currentTime / 60),
          },
          Totaltime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60),
          },
        });
      }
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [audioref]);

  const contextValue = {
    audioref,
    seekBg,
    seekBar,
    playStatus,
    play,
    pause,
    track,
    setTrack,
    time,
    setTime, 
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <playerContext.Provider value={contextValue}>
      {props.children}
      <audio ref={audioref} src={track.file} preload='auto'></audio>
    </playerContext.Provider>
  );
};

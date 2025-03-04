import React, { useContext } from 'react';
import Sidebar from './components/sidebar';
import Player from './components/player';
import Display from './components/Display';
import { playerContext } from './context/playerContext';

const App = () => {


  const {useRef,track}=useContext(playerContext);


  return (
    <div className="h h-screen bg-black">
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio ref={useRef} src={track.file} preload='auto'>

      </audio>
    </div>
  );
};

export default App;
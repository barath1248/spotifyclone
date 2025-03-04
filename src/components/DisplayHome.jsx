import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import Alubumitem from './Alubumitem'
import { songsData } from '../assets/assets'
import SongItem from './SongItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='overflow-auto flex '>
        {albumsData.map((item,index)=>(<Alubumitem key={index} name={item.name} desc={item.desc}id={item.id}  image={item.image} />))}
        </div> 
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
        <div className='overflow-auto flex '>
        {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc}id={item.id}  image={item.image} />))}
        </div>    
      </div>

  
    </>
  )
}

export default DisplayHome

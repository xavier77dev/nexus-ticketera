import React from 'react'
import loadingGif from '../../assets/Gif/XOsX.gif'
import 'ldrs/ring'
 
const Loading = () => {
  return (
    <div className='full justify-center items-center'>
        <img src={loadingGif} alt="" />
    </div>
  )
}

export default Loading
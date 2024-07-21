import React from 'react';

const Genres = (props)=> {
  return (
    <div className='text-center py-2 px4 bg-red-400 rounded-lg text-white'>
      <div>{props.name}</div>
    </div>
  )
}

export default Genres;
import React from 'react'

const Modal = ({isVisible}: { isVisible: boolean}) => {
  if ( !isVisible ) return null;
  return (
    <div className=' fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
      <div className='w-[809px] flex flex-col'>
        <button className='text-pure-white text-xl place-self-end'>X</button>
        <div className='drop-shadow-sm bg-medium-gray text-darker-white text-xl p-8 rounded-[8px]'> 
          Faça uma publicação
        </div>
      </div>
    </div>
  )
}

export default Modal
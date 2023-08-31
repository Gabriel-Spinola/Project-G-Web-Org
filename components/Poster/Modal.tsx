import React, { useEffect, useRef } from 'react';

const Modal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!event.target.classList.contains('notClose')) {
        onClose(); // Chamando a função onClose para fechar o modal
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [onClose]); // Adicionei o onClose como dependência para o useEffect

  if (!isVisible) return null;

  return (
    <div className=' fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-20'>
      <div className='w-[809px] h-[192px] flex flex-col mt-[-20%] z-10'>
        <button className='text-medium-gray text-xl place-self-end' onClick={onClose}>X</button>
        <div className='notClose z-1 drop-shadow-sm bg-medium-gray text-darker-white text-xl p-8 rounded-[8px]'>
          <form className='notClose'>
            <input type='text' placeholder='Faça uma publicação' className='notClose bg-medium-gray text-darker-white w-full pb-[192px] text-xl margin-none text-start outline-none'></input>
            <div className='notClose max-h-[64px] flex flex-row justify-between'>
              <div className='notClose'>
                <button className='notClose p-1 relative overflow-hidden flex flex-row mt-8 text-medium-primary select-none text-sm hover:text-darker-white border-solid border-darker-white border-2 rounded bg-darker-white hover:bg-medium-primary hover:border-medium-primary'>
                  <i className='notClose importPdf'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='notClose mr-2'><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9zm4 2h1v-1h-1V9h1V8h-2v5h1zm-8 0h1c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H9v5h1v-2zm0-2h1v1h-1V9z" /></svg>
                  </i>
                  Envie um PDF
                  <input type='file' accept='.pdf' multiple className='notClose absolute left-5 top-0 scale-150 scale-y-150 opacity-0'></input>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;

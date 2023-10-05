/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import SendImageButton from './SendImageButton'
import SendPDFButton from './SendPDFButton'
import React from 'react'
import SubmitPostButton from './submitPostButton'

export function FeedModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="w-[40vw] h-[192px] flex flex-col mt-[-20%] z-10">
        <div className="notClose z-1 drop-shadow-sm bg-medium-gray text-darker-white text-xl p-8 rounded-[8px]">
          <form className="notClose">
            <div className="notClose max-h-[64px] flex flex-row">
              <input
                type="text"
                placeholder="Faça uma publicação"
                className="notClose bg-medium-gray text-darker-white w-full pb-[192px] text-xl margin-none text-start outline-none"
              ></input>
            </div>

            <div className="flex flex-row">
              <SendPDFButton />
              <SendImageButton />
              <SubmitPostButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

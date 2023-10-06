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
import SubmitPostButton from './SubmitPostButton'
import { createNewPost } from '@/app/feedActions'

export function FeedModal() {
  async function handleFormSubmission(formData: FormData): Promise<void> {
    const content = formData.get('content')?.toString() ?? 'nocontent'
    const images = formData.get('images') as File[] | null

    if (!content || !images) {
      alert('null' + content + images)

      return
    }

    const { error } = await createNewPost(formData)

    if (error) {
      alert('failed to post' + error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="w-[40vw] h-[260px] flex flex-col mt-[-20%] z-10">
        <div className="notClose z-1 drop-shadow-sm bg-medium-gray text-darker-white text-xl p-8 rounded-[8px]">
          <form action={handleFormSubmission} className="notClose">
            {/* Content */}
            <div className="notClose max-h-[80px] flex flex-row">
              <textarea
                name="content"
                placeholder="Faça uma publicação"
                className="notClose bg-medium-gray text-darker-white w-full pb-[192px] text-xl margin-none text-start outline-none"
              ></textarea>
            </div>

            {/* Input Buttons */}
            <div className=" mt-3 flex flex-row">
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

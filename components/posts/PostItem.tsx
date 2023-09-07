/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import React from 'react'
import Image from 'next/image'
import './PotItem.module.scss'
import { Post } from '@prisma/client'

interface Params {
  post: Post
}

export default function PostItem({ post }: Params) {
  return (
    <div className="postado mb-8">
      <div className="autor">
        <div className="foto overflow-x-auto"></div>
        <a
          className="nome-localizacao"
          href="/client/profile/cllgwtgbt0000w42oblx1qp27"
        >
          <h1 className="nome">Oscar Alho</h1>
          <small className="localizacao text-darker-white">
            Belo Horizonte, MG
          </small>
        </a>
      </div>

      <article className="p-1">
        Exercitationem maxime officia cupiditate accusantium eveniet maxime ut
        nam. Error reiciendis voluptates. Dicta autem velit ex sapiente ipsum
        doloribus pariatur. Debitis blanditiis fuga corporis impedit corrupti
        vero. Odio quia quos illo.
      </article>

      <div className="image-container">
        <Image
          className="one-img "
          src="/test-img/imgtest.jpg"
          alt="imgtest"
          width={776}
          height={1000}
          priority
        />
      </div>

      <div id="reacts" className="w-[100%] h-[48px] mt-4 flex flex-row">
        <div className="like flex flex-col justify-center items-center  hover:text-medium-primary w-[48px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84Zm-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"
            />
          </svg>
          <span>125</span>
        </div>

        <div className="comment  flex flex-col justify-center items-center ml-8  hover:text-medium-primary w-[48px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6Z"
            />
          </svg>
          <span>125</span>
        </div>
      </div>
    </div>
  )
}

import React from 'react';
import Image from 'next/image';
import '@/components/Posts/style.scss'

export default function Postbyuser() {
    return (
        <div className="postado">
            <div className='autor'>
                <div className='foto'></div>
                <div className='nome-localizacao'>
                    <span className='nome'>Oscar Alho</span>
                    <span className='localizacao'>Belo Horizonte, MG</span>
                </div>
            </div>
            <div className='paragrafo'>
            Exercitationem maxime officia cupiditate accusantium eveniet maxime ut nam. Error reiciendis voluptates. Dicta autem velit ex sapiente ipsum doloribus pariatur. Debitis blanditiis fuga corporis impedit corrupti vero. Odio quia quos illo.
            </div>
            <div className='one-img'>
                <Image

                    src="/test-img/imgtest.jpg"
                    alt="imgtest"
                    width={776}
                    height={365}
                    style={{objectFit: "cover"}}
                    priority
                />
            </div>
        </div> 
        
        
    )
}
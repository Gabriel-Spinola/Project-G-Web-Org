/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { Icon, Img } from '@chakra-ui/react'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'
import styles from './exploreCarousel.module.scss'

export default function Carousel() {
  return (
    <div className="flex flex-col gap-32 items-center">
      <section
        id="carousel"
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <a
          href="/"
          id="item-1"
          className="h-[25vh] flex bg-darker-white rounded-xl md:w-[28vw]"
        >
          <Img
            src="/assets/explore/photo-1562185363-aa9551ce00d4.webp"
            className="h-full w-full object-cover rounded-xl"
            alt="Rounded Building"
          />
          <div className={styles.hoverAnimation}>
            <p>ENGENHARIA</p>
          </div>
        </a>
        <a
          href="/"
          id="item-1"
          className="h-[25vh] flex bg-darker-white rounded-xl md:w-[28vw]"
        >
          <Img
            src="/assets/explore/photo-1612387290123-34af734b5f61.webp"
            className="h-full w-full object-cover rounded-xl"
            alt="Garden Pool"
          />
          <div className={styles.hoverAnimation}>
            <p>ARQUITETURA</p>
          </div>
        </a>
        <a
          href="/"
          id="item-1"
          className="h-[25vh] flex bg-darker-white rounded-xl md:w-[28vw]"
        >
          <Img
            src="/assets/explore/photo-1591874204276-1ebd20fb8db6.webp"
            className="h-full w-full object-cover rounded-xl"
            alt="Kobra Graffiti"
          />
          <div className={styles.hoverAnimation}>
            <p>ARTE URBANA</p>
          </div>
        </a>
      </section>
      <Icon
        as={MdOutlineKeyboardDoubleArrowDown}
        color={'#ebebeb'}
        w={12}
        h={12}
      />
    </div>
  )
}

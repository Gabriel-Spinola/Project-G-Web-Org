import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSolidShare } from 'react-icons/bi'
import { AiFillWarning } from 'react-icons/ai'
import DeletePostButton from '../Buttons/DeletePostButton'
import { $Enums } from '@prisma/client'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react'

interface Props {
  postId: string
  isOwner: boolean
  currentUserPosition: $Enums.Positions | undefined
}

export default function PostSettings({
  postId,
  isOwner,
  currentUserPosition,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <section className="z-[999]">
      <button onClick={onOpen}>
        <BsThreeDotsVertical size={'24'} />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size={'xs'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bgColor={'#262626'}
            textColor={'#ebebeb'}
            roundedTop={'md'}
          >
            Opções
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={0}>
            <ul className="py-4 bg-light-gray text-darker-white rounded-b-md">
              <li className="w-full p-2 flex justify-start gap-4 bg-light-gray hover:bg-darker-gray hover:cursor-pointer">
                <BiSolidShare size={20} />
                Compartilhar publicação
              </li>
              {!isOwner ? (
                <li className="w-full p-2 flex justify-start gap-4 bg-light-gray hover:bg-darker-gray hover:cursor-pointer">
                  <AiFillWarning size={20} />
                  Denunciar publicação
                </li>
              ) : null}
              {isOwner || currentUserPosition === $Enums.Positions.Admin ? (
                <>
                  <li className="w-full p-2 bg-light-gray hover:cursor-pointer hover:bg-darker-gray flex gap-4 items-center">
                    <DeletePostButton postId={postId} />
                  </li>
                </>
              ) : null}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  )
}

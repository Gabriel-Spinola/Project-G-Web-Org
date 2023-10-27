'use client'

import FollowButton from '@/components/Buttons/FollowButton'
import styles from './profile.module.scss'
import { UserData } from '@/lib/types/common'
import { BellIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { MdWork } from 'react-icons/md'
import { PiSunHorizonFill } from 'react-icons/pi'
import { RiGraduationCapFill } from 'react-icons/ri'
interface Params {
  isOwner: boolean
  currentUserId?: string
  isFollowing: boolean
  user: Partial<UserData>
}

export default function UserInfo(params: Params) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <section
      id={styles.userInfo}
      className="mt-8 w-80% lg:w-[312px] rounded-[12px] p-4 bg-pure-white text-darker-gray"
    >
      <h1 className="text-center text-lg font-bold uppercase">Sobre mim</h1>
      <p id="description">{params.user.description}</p>

      {!params.isOwner && (
        <FollowButton
          authorId={params.currentUserId}
          isFollowing={params.isFollowing}
          targetId={params.user.id as string}
        />
      )}

      <hr />

      <div className="flex flex-col py-2 gap-2">
        {params.isOwner && (
          <Button leftIcon={<EditIcon />} onClick={onOpen}>
            Edite seus dados
          </Button>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Edite seus dados</ModalHeader>
            <ModalCloseButton />

            <form>
              <ModalBody visibility={params.isOwner ? 'visible' : 'hidden'}>
                <FormLabel>Telefone</FormLabel>

                <Editable
                  defaultValue={
                    params.user.contactPhone?.toString() ?? '(xx) xxxx-xxxx'
                  }
                  isPreviewFocusable={true}
                >
                  <EditablePreview />
                  <EditableInput
                    display="Seu núemro de celular"
                    type="text"
                    name="title"
                    id="title"
                  />
                </Editable>

                <FormLabel>Localização</FormLabel>
                <Editable defaultValue={'Sua localização'}>
                  <EditablePreview />
                </Editable>

                <Divider />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>

                <Button colorScheme="blue" mr={3} type="submit">
                  Salvar
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <span>
          <BellIcon w={6} h={6} /> Seguidores:{' '}
          <span className="font-bold">
            {params.user._count?.followers ?? 0}
          </span>
        </span>

        <span>
          <BellIcon w={6} h={6} /> Seguindo:{' '}
          <span className="font-bold">
            {params.user._count?.following ?? 0}
          </span>
        </span>

        <span>
          <Icon as={RiGraduationCapFill} w={6} h={6} /> Graduação:{' '}
          {params.user.graduations?.map((graduation, index) => (
            <span key={index} className="font-bold">
              {graduation}
            </span>
          ))}
        </span>

        <span>
          <Icon as={PiSunHorizonFill} w={6} h={6} /> De:{' '}
          <span className="font-bold">{params.user.location}</span>
        </span>

        <span>
          <Icon as={BsFillPinMapFill} w={6} h={6} /> Em:{' '}
          <span className="font-bold">{params.user.location}</span>
        </span>

        <span>
          <Icon as={MdWork} w={6} h={6} /> Trabalho:{' '}
          <span className="font-bold">Senai CTTI</span>
        </span>

        <span>
          <Icon as={BsFillTelephoneFill} w={6} h={6} /> Telefone:{' '}
          <span className="font-bold">
            {params.user.contactPhone?.toString() ?? '+55 31 97300-8566'}
          </span>
        </span>
      </div>
    </section>
  )
}

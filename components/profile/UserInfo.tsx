'use client'

import React from 'react'
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
import { BellIcon, EditIcon } from '@chakra-ui/icons'
import { RiGraduationCapFill } from 'react-icons/ri'
import { PiSunHorizonFill } from 'react-icons/pi'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { MdWork } from 'react-icons/md'
import styles from '@/components/profile/profile.module.scss'
import { UserData } from '@/lib/types/common'

interface Params {
  isOwner: boolean
  work: string
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

      <hr />

      <div className="flex flex-col py-2 gap-2">
        <Button leftIcon={<EditIcon />} onClick={onOpen}>
          Edite seus dados
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Edite seus dados</ModalHeader>
            <ModalCloseButton />

            <form>
              <ModalBody visibility={params.isOwner ? 'visible' : 'hidden'}>
                <FormLabel>Título</FormLabel>
                <Editable defaultValue={'aaa'} isPreviewFocusable={true}>
                  <EditablePreview />
                  <EditableInput
                    display="insira um título"
                    type="text"
                    name="title"
                    id="title"
                  />
                </Editable>

                <FormLabel>Descrição</FormLabel>
                <Editable defaultValue={'test'}>
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
          <span className="font-bold">{params.work}</span>
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

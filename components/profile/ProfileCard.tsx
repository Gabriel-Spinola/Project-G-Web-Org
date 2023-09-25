/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  Divider,
  FormLabel,
  EditableTextarea,
  Avatar,
  Box,
  Image,
  IconButton,
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'
import { BsFillGearFill } from 'react-icons/bs'

import { User } from 'next-auth'
import React, { FormEvent } from 'react'

interface Params {
  // name and location params are temporary, please delete them later
  name: string
  title: string
  user: User
  isOwner: boolean
}

type TestOfResponseType = {
  message: string
  operation: string
}

const defaultEditFormValues = {
  title: 'Insira seu titulo',
  description: 'Insira uma descrição',
}

export default function DisplayUserInfo({
  // name and location params are temporary, please delete them later
  name,
  title,
  user,
  isOwner,
}: Params): React.JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    // Helper function to get a field's value or default to an empty string
    const getFieldValueOrDefault = (
      fieldName: string,
      defaultValue: string,
    ) => {
      const fieldValue = formData.get(fieldName) as string | null

      return fieldValue === defaultValue ? '' : fieldValue
    }

    // Update form data for 'title' field
    formData.set(
      'title',
      getFieldValueOrDefault('title', defaultEditFormValues.title) ?? '',
    )

    // Update form data for 'description' field
    formData.set(
      'description',
      getFieldValueOrDefault(
        'description',
        defaultEditFormValues.description,
      ) ?? '',
    )

    try {
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS.handlers.updateUser}?id=${user.id}`,
        {
          method: 'PUT',
          body: formData,
        },
      )

      if (!response.ok) {
        console.error('Response not okay')
      }

      const { message, operation }: Partial<TestOfResponseType> =
        await response.json()

      console.log(message)
      console.log(operation)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <section
      id="Wrapper"
      className="flex h-[208px] min-w-full max-w-full items-center gap-[32px] py-0 px-[64px]"
    >
      <Box
        className="absolute w-[100%] h-[208px] overflow-visible ml-[-64px] z-99"
        bgImage={
          'https://lh3.googleusercontent.com/fife/AKsag4MR7T9EHVsTDyFG1gqEw7mxFb1BtXCsWJDrcxSNH6erLIIk7IByFL7zOpWKO5ldjCGldNxambQ56yVYI4ierHkmMjdCMfDFR7sLcTjEGdwseayprg9PWilSPCQN7CTYsjb3O9XzfVy-tDZY8StQ5CexgLTkcbc5oJMTEls7YO2oPL6EeQcovgT3vr-FIqOiyPlvzcJf8g1u7oSoVGgiUQqLerdCLwr_n-60a8mHkUOnI8DIejK352vN280U4v36EB_yckVCMkStuH4Yso23MrwHoLWICrvGC5VxPyTQJ4CMwxy7ruqYimbKxgtnJbT7AeUy6gsITCN_Jl5zC2OOrQk_4jDwjqpPZBgeJAPb5UXvnofge5EIQwvpTU3FABidqS0IGLSAstmo2S_3t614iwrKcCnWJm5EqvuxBFAh-NqX9fKFG7BD5vUGWnFvirSdsWVbX_Y06dyWvQcg4bEVqUdgigYGutS2BTO9eds1Ymp-dR_tQ5KAl8WjCpCvhgatg1IBPJRYIKsLXj2wAC2Fl7sojRabrZUvbjZ7am-YuZCRFSYJKAFsE1sUjbuUuIsORVbOOYEzkX4sVAffWrpfY3GHSCdTa9V3rRPW2DZvkC-qisg6-tDm2w5iCKor89JpYieZRlNwpCJWmkCwFCMdrJ8rZtQmPTUtcuSbDbYfgh9ydcX2YofUfrSD4Kuo7KjdrtYWNIMiooGikqkxmB2AvHgpcZg6jp-RppCBTuxxVXtIg69HemSPJXhjewk38gQQ9N7axxgAAQg38vBhwSa6HQk99PdoWP5T32C5-gcuz5nkR4h_9_0jihHwGJfQo5YLgj5Co-q43lq0Q648lf2FsbKJ_iDD9r6drARlKZMLeejOqBtzDtc13niGONTRSA4E8R9cVliktoViFeJsTtNcsg27sMy2ckqa5U7iZsgxAOS5WBt6zY9Ig7DYZ_TGtu64MPIshYe7_BrFUg-CMrlN5QHt7s0UPZIF3R3Fse75Wl62vSzA90bZnNRm0ZWyLNNQH8SYOH32jy4WSmryIj4SHog-M4zWLro-IUgxPtvtdTaKn4o0bwpNynxapOxIIzr_4kH4FQiOLNT3U9I0W2q53dYXdVNqYOtX7sYOl6bJPnr5iZ0s7EHFqF4uOm9suY0GtuHUCkn1VUmYwuKtLx7cADeKxwP9XEzSCAAKuL_VeM_iDm3d-fFmvL8FZPk6vG_20ImLemuVbFDtTr03R-u7CMDGqWkKOyoze8ZCkA7gHSRv1lbkolLRyAbpyPaM5Iyh4v7nDm17q6Md8NaUcdtdQIwlE70_2cJSvJ5GGL1sZn0f38Yvcj3QpsSPz9fTq9GWNvYQsVDlafHuTkLWPO1WU7sYRzZGavmY4Qksuigp0oVAd6bghY6LrH31bwEc16e4YIW9EJl3PWbSpq1aMGMS_GZmqaFNbdJRLRblTJYawntbcw9is-TKTXS53A4qA7mMBQ2DBUYrzrB9BzecGt4I-4jtXtebvro7X5uBKZxkq3d7SqdJdPCjpOKEHvDNlIxLbwGRwwp8lgPNQuJzRmERIIk61ucl2mILAdHMwSUl1QvuHEZ_Ga91Z_BuQQ7-kw=w1865-h961'
        }
        bgSize={'cover'}
      ></Box>
      <Box className="absolute w-[100%] h-[208px] bg-black bg-opacity-75 ml-[-64px]"></Box>

      <div id="profile-avatar-wrapper">
        <Avatar size={'2xl'} src={user?.image || ''}></Avatar>
      </div>
      <div
        id="profile-info-wrapper"
        className="flex flex-row items-center w-[100%] h-[161px] gap-[75%] text-darker-white z-[1]"
      >
        <div id="info-name-wrapper" className="flex flex-col">
          <h1 className="text-4xl text-medium-primary font-bold">
            {/* variable name is temporary! Replace it to user?.name */}
            {name || ''}
          </h1>
          <h2 className="text-xl font-thin text-light-white">
            {/* variable name is temporary! Replace it to user?.name */}
            {title || ''}
          </h2>
        </div>
      </div>

      {/* <h1>{user?.name}</h1>
      <h2>{user?.title || ''}</h2>
      <p>{user?.description || ''}</p>
      <h1>Linkedin: {user?.linkedinUrl || ''}</h1>
      <h1>Site: {user?.siteUrl}</h1>
      <h1>phone: {user?.contactPhone}</h1>
      <h1>email: {user?.email}</h1> */}

      {isOwner && (
        <div className="max-w-[10%]">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsFillGearFill />}
              variant="outline"
              color={'white'}
              className="bg-pure-white bg-opacity-25 absolute hover:text-darker-gray"
            />
            <MenuList>
              <MenuItem icon={<EditIcon color="white" />} onClick={onOpen}>
                Editar Perfil
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Modifique seu perfil</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleFormSubmission}>
            <ModalBody>
              <FormLabel>Título</FormLabel>
              <Editable
                defaultValue={user?.title || defaultEditFormValues.title}
                isPreviewFocusable={true}
              >
                <EditablePreview />
                <EditableInput
                  display="insira um título"
                  type="text"
                  name="title"
                  id="title"
                />
              </Editable>

              <FormLabel>Descrição</FormLabel>
              <Editable
                defaultValue={
                  user?.description || defaultEditFormValues.description
                }
              >
                <EditablePreview />
                <EditableTextarea name="description" id="description" />
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
    </section>
  )
}

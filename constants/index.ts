import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// In order to pass a parameter into the URL use the `/pageName/idValue` syntax

export const NavLinks = [
  { href: '/client/explore', key: 'Explore', text: 'Explorar' },
  { href: '/client/projects', key: 'Projects', text: 'Projetos' },
  { href: '/', key: 'Home', text: '' },
  { href: '/client/architects', key: 'Architects', text: 'Arquitetos' },
  { href: '/client/profile?id=1', key: 'Profile', text: 'Perfil' },
  { href: '/api/auth/signin', key: 'SingIn', text: '' },
  { href: '/api/auth/signout', key: 'SingOut', text: '' },
]

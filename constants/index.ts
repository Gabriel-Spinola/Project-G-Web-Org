/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

// In order to pass a parameter into the URL use the `/pageName/idValue` syntax

export const NavLinks = [
  { href: '/client/explore', key: 'Explore', text: 'Explorar' },
  { href: '/client/explore', key: 'Projects', text: 'Projetos' },
  { href: '/', key: 'Home', text: '' },
  { href: '/client/architects', key: 'Architects', text: 'Arquitetos' },
  { href: '/client/profile?id=1', key: 'Profile', text: 'Perfil' },
  { href: '/api/auth/signin', key: 'SingIn', text: '' },
  { href: '/api/auth/signout', key: 'SingOut', text: '' },
]

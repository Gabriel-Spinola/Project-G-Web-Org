/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import LoginForm from './forms/loginForm'
import RecoveryPassword from './forms/recoverPassword'
import RegisterForm from './forms/registerForm'

export default function ToggleForms() {
  const loginForm = true
  const registerForm = false
  const recoveryForm = false

  if (loginForm) {
    return <LoginForm />
  } else if (registerForm) {
    return <RegisterForm handleFormChange={fdsadsa} />
  } else if (recoveryForm) {
    return <RecoveryPassword />
  } else {
    return null
  }
}

import React from 'react'

import styles from "./LoginForm.module.scss";
import { ILoginForm } from '@widgets/AuthLoginForm';

const LoginForm = ({
  onSubmit,
  config
}: {
  onSubmit: (e: React.FormEvent) => void,
  config: ILoginForm[]
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.login_form}>
      {config.map((filed, indx) => (
        <div className={styles.form_unit} key={indx}>
          <label>{filed.label}</label>
          <input type={filed.input.type} name={filed.input.name} />
        </div>
      ))}
      <button type='submit'>Log in</button>
    </form>
  )
}

export default LoginForm
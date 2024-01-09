import header from '../assets/header.svg'
import styles from './Header.module.css'

export function Header() {
  return (
    <div className={styles.header}>
      <img src={header} alt="logo" />
    </div>
  )
}

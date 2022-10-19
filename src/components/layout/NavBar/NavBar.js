import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import logo from '../../../assets/images/costs_logo.png';
import Container from '../Container/Container'

export default function NavBar () {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs"/>
        </Link>
        <ul className={styles.list}>
          <li className={styles.listItems}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.listItems}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={styles.listItems}>
            <Link to="/company">Empresa</Link>
          </li>
          <li className={styles.listItems}>
            <Link to="/contact">Contato</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

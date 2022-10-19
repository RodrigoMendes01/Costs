import styles from './Loading.module.css';
import loading from '../../../assets/images/loading.svg';

export default function Loading () {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loader} src={loading} alt="Loading display"/>
    </div>
  )
}
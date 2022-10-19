import { useEffect, useState } from 'react';
import styles from './Message.module.css';

export default function Message ({ type, message}) {

  const [visible, setvisible] = useState(false)

  useEffect(() => {
    if (!message) {
      setvisible(false)
      return
    }

    setvisible(true)

    const timer = setTimeout(() => {
      setvisible(false)
    }, 3000)

    return () => clearTimeout(timer)

  }, [message])

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
        {message}
        </div>
      )}
    </>
  )
}
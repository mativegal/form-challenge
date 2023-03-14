import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import firebaseApp from '../../credenciales'
import { Link, useParams } from 'react-router-dom'
import styles from './Usuario.module.css'

const db = getFirestore(firebaseApp)

const Usuario = () => {
  const [user, setUser] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const docRef = doc(db, 'usuarios', id)
        const docSnap = await getDoc(docRef)

        const data = docSnap.exists() ? setUser(docSnap.data()) : null

        if (data === null || data === undefined) return null
      } catch (error) {
        console.log('Error al obtener el documento:', error)
      }
    }
    getUserInfo()
  }, [id])

  const date = new Date(user?.birth_date / 1000000).toLocaleDateString()

  return (
    <div className={styles.container}>
      <section className={styles.data}>
        <p className={styles.label}>Nombre completo:</p>
        <p>{user?.full_name}</p>
      </section>
      <section className={styles.data}>
        <p className={styles.label}>Correo electrónico:</p>
        <p>{user?.email}</p>
      </section>
      <section className={styles.data}>
        <p className={styles.label}>País de origen:</p>
        <p>{user?.country_of_origin}</p>
      </section>
      <section className={styles.data}>
        <p className={styles.label}>Fecha de nacimiento:</p>
        <p>{date}</p>
      </section>

      <Link to={`http://localhost:3000/`} className={styles.back}>
        Vuelve al Formulario
      </Link>
    </div>
  )
}

export default Usuario

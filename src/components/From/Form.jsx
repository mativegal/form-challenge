import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import yupSchema from '../../utils/yupSchema'
import data from '../../utils/form.json'
import firebaseApp from '../../credenciales'
import styles from './Form.module.css'

const db = getFirestore(firebaseApp)

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      full_name: '',
      email: '',
      birth_date: null,
      country_of_origin: null,
      terms_and_conditions: null,
    },
  })

  const notify = (id) =>
    toast.success(<Link to={`/${id}`}>Aquí puedes ver tu información</Link>, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const { items } = data

  const onSubmit = async (formData) => {
    try {
      const docRef = await addDoc(collection(db, 'usuarios'), {
        ...formData,
      })
      notify(docRef.id)
    } catch (error) {
      console.log(error)
    }
  }

  const onReset = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.formContainerInside}>
        <h1 className={styles.title}>Formulario</h1>
        <p className={styles.req}>Todos los campos son obligatorios</p>

        {/* Nombre */}
        <section className={styles.section}>
          <label className={styles.label}>{items[0].label}</label>
          <input
            className={styles.input}
            type={items[0].type}
            {...register(items[0].name, {
              required: items[0].required,
            })}
          />
          <p className={styles.error}>{errors.full_name?.message}</p>
        </section>

        {/* Email */}
        <section className={styles.section}>
          <label className={styles.label}>{items[1].label}</label>
          <input
            className={styles.inputEmail}
            type={items[1].type}
            {...register(items[1].name, {
              required: items[1].required,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          <p className={styles.error}>{errors.email?.message}</p>
        </section>

        {/* Birth Date */}
        <section className={styles.section}>
          <label className={styles.label}>{items[2].label}</label>
          <input
            className={styles.inputBirth}
            type={items[2].type}
            {...register(items[2].name, {
              required: items[2].required,
            })}
          />
          <p className={styles.error}>{errors.birth_date?.message}</p>
        </section>

        {/* Counrty of origin */}
        <section className={styles.section}>
          <label className={styles.label}>{items[3].label}</label>
          <select {...register(items[3].name)} className={styles.inputCountry}>
            {items[3].options.map((option, optionIdx) => (
              <option
                key={optionIdx}
                value={option.value}
                className={styles.options}
              >
                {option.label}
              </option>
            ))}
          </select>
          <p className={styles.error}>{errors.country_of_origin?.message}</p>
        </section>

        {/* Terms & conditions */}
        <section className={styles.terms}>
          <label className={styles.labelTerms}>{items[4].label}</label>
          <input
            className={styles.tcInput}
            type={items[4].type}
            {...register(items[4].name, {
              required: items[4].required,
            })}
          />
          <p className={styles.error}>{errors.terms_and_conditions?.message}</p>
        </section>

        {/* Send & Reset */}
        <section className={styles.buttonContainer}>
          <input type='submit' className={styles.button} />

          <button onClick={onReset} className={styles.button}>
            Resetear
          </button>
        </section>
      </div>

      <ToastContainer />
    </form>
  )
}

export default Form

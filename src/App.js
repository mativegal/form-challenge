import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './components/From/Form.jsx'
import Usuario from './components/Usuario/Usuario.jsx'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainerInside}>
        <Router>
          <Routes>
            <Route path='/' element={<Form />} />
            <Route path='/:id' element={<Usuario />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App

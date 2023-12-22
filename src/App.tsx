import { Header } from "./components/Header"
import { Task } from "./components/addTask"
import { TaskEmpty } from "./components/TaskList/tasks"
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.content}>
      <Header/>
      <Task/>
      <TaskEmpty/>
    </div>
  )
}


export default App

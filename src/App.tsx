import { Header } from './components/Header'
import { AddTask } from './components/addTask'
import { Tasks } from './components/TaskList/tasks'
import styles from './App.module.css'
import { CountTasks } from './components/countTasks'
import { useEffect, useState } from 'react'
import { ClipboardList } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Modal } from './components/modal'
// Tudo que varia de uma task para outra.
// tasks {ID: number, status: "", content: ""}

export interface ITasks {
  id: string
  status: boolean
  content: string
  createdAt?: number
}

export interface QuantityTasks {
  counts: number
}

const TASKS_STORAGE_KEY = 'TodoList:Tasks'
// const TASKSSTATUS_STORAGE_KEY = 'TodoList:Status'

function App() {
  const [hasCompletedTask, setHasCompletedTask] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const [tasks, setTasks] = useState<ITasks[]>(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
    if (storedTasks) {
      return JSON.parse(storedTasks)
    }
    return []
  })

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
  }

  function addTasks(taskContent: string) {
    const copyOfTasks = [...tasks]
    copyOfTasks.unshift({
      id: crypto.randomUUID(),
      status: false,
      content: taskContent,
      createdAt: new Date().getTime(),
    })
    setTasks(copyOfTasks)
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: !task.status,
        }
      }
      return task
    })

    orderTasksByDate(newTask)
    orderTasksByStatus(newTask)
    setTasks(newTask)
  }

  function orderTasksByDate(newTask: ITasks[]) {
    // ordenar tasks por data
    newTask.sort((a, b) => {
      const x = a.createdAt ? a.createdAt : new Date().getTime()
      const y = b.createdAt ? b.createdAt : new Date().getTime()
      return x - y
    })
  }

  function orderTasksByStatus(newTask: ITasks[]) {
    // ordenar tasks por status
    newTask.sort((toDo, done) => {
      if (toDo.status === false) {
        return -1
      } else if (done.status === true) {
        return 1
      } else {
        return 0
      }
    })
  }

  const taskQuantity = tasks.length
  const completedTask = tasks.filter((task) => task.status).length

  function handleClearTasksDone() {
    const newTasks = tasks.filter((task) => task.status === false)
    setTasks(newTasks)
  }

  function handleClearTasksAll() {
    setTasks([])
  }

  const handleEditTask = (taskId: string, newContent: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, content: newContent }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.status === true)
    setHasCompletedTask(completedTasks.length > 0)
  }, [tasks])

  // localStorage
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className={styles.content}>
      <Header />
      <AddTask onAddTask={addTasks} />

      <CountTasks taskQuantity={taskQuantity} completedTask={completedTask} />

      {tasks.map((task) => {
        return (
          <Tasks
            key={task.id}
            tasks={task}
            onDelete={deleteTaskById}
            onComplete={toggleTaskCompletedById}
            taskQuantity={taskQuantity}
            onEdit={handleEditTask}
          />
        )
      })}

      {taskQuantity <= 0 && (
        <div className={styles.taskListEmpty}>
          <ClipboardList size={60} />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
          </p>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {tasks.length > 0 && (
          <div className={styles.buttonsClear}>
            <button
              className={
                hasCompletedTask
                  ? styles.btnClearDone
                  : styles.bntClearDoneDisabled
              }
              onClick={handleClearTasksDone}
              disabled={!hasCompletedTask}
            >
              Limpar concluidas
            </button>
            <Dialog.Trigger asChild>
              <button
                className={styles.btnClearAll}
                onClick={() => setOpen(true)}
              >
                Limpar tudo
              </button>
            </Dialog.Trigger>
            <Modal setOpen={setOpen} deleteTask={handleClearTasksAll} />
          </div>
        )}
      </Dialog.Root>
    </div>
  )
}

export default App

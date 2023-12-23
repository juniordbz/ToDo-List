import { Header } from "./components/Header"
import { AddTask } from "./components/addTask"
import { Tasks } from "./components/TaskList/tasks"
import styles from './App.module.css'
import { CountTasks } from "./components/countTasks";
import { useState } from "react";


// Tudo que varia de uma task para outra.
// tasks {ID: number, status: "", content: ""}

export interface ITasks{
  id: string;
  status: boolean;
  content: string;
}

export interface QuantityTasks{
  counts: number;
}

function App() {

  const [tasks, setTasks] = useState<ITasks[]>([
    // {
    //   id: '1',
    //   status:true,
    //   content:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga quisquam alias tempore dolorum minima voluptatum voluptatem sit deleniti in iure accusantium, reprehenderit provident nulla aspernatur obcaecati rerum, ea at culpa.',
    // } ,
    // {
    //   id: '2',
    //   status:false,
    //   content:'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    // } ,
    // {
    //   id: '3',
    //   status:false,
    //   content:'Fuga quisquam alias tempore dolorum minima voluptatum voluptatem sit deleniti in iure accusantium, reprehenderit provident nulla aspernatur obcaecati rerum, ea at culpa.',
    // },
  ]);

  function  deleteTaskById(taskId: string){
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks);
  }

  function addTasks(taskContent: string){
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        status: false,
        content: taskContent,
      }
    ])
  }

  const taskQuantity = tasks.length;
  const completedTask = tasks.filter( task => task.status).length;

  return (
    <div className={styles.content}>
      <Header/>
      <AddTask
        onAddTask={addTasks}      
      />

      <CountTasks
        taskQuantity={taskQuantity}
        completedTask={completedTask}
      />

      {tasks.map(task =>{
        return (
          <Tasks            
            key={task.id}
            tasks={task}
            onDelete={deleteTaskById}
          />
        )
      })}
      
    </div>
  )
}

export default App

import { Header } from "./components/Header"
import { AddTask } from "./components/addTask"
import { Tasks } from "./components/TaskList/tasks"
import styles from './App.module.css'
import { CountTasks } from "./components/countTasks";
import { useState } from "react";
import { ClipboardList } from "lucide-react";



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

  const [tasks, setTasks] = useState<ITasks[]>([]);

  function  deleteTaskById(taskId: string){
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks);
  }

  function addTasks(taskContent: string){
    const copyOfTasks = [...tasks]
    copyOfTasks.unshift({
      id: crypto.randomUUID(),
      status: false,
      content: taskContent,
    })
    setTasks(copyOfTasks)
  }
  
  function toggleTaskCompletedById(taskId: string){
    const newTask = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: !task.status,
        }
      }
      return task;
    });

    // ordenar tasks por status
    newTask.sort((toDo, done)=>{
     if(toDo.status === false){
      return -1;
     } else if(done.status === true){
      return 1;
     }else {
      return 0;
     }
    })
    setTasks(newTask);
    
  }

  const taskQuantity = tasks.length;
  const completedTask = tasks.filter( task => task.status).length;

  function handleClearTasksDone(){
    const newTasks = tasks.filter(task => task.status === false)
    setTasks(newTasks);
  }

  function handleClearTasksAll(){
    const confirmationDelete = confirm("Tem certeza que seja deletar todas as terefas?");
    if(confirmationDelete === true){
      setTasks([]);
    }
  }
  
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
            onComplete={toggleTaskCompletedById}
            taskQuantity={taskQuantity}
          />
        )
      })}

     {taskQuantity <=0 &&
      (
        <div className={styles.taskListEmpty}>
        <ClipboardList
          size={60}
        />
        <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
        <span>Crie tarefas e organize seus itens a fazer</span>

        </div>
      )} 

{/* 
    {tasks.map(task =>  {    
     return( */}
     {taskQuantity > 0 && 
        <div className={styles.buttonsClear} >
          <button 
          className={!status ? styles.btnClearDone : styles.bntClearDoneDisabled  } 
          onClick={handleClearTasksDone}
          >
            Limpar concluidas
          </button> 

          <button className={styles.btnClearAll} onClick={handleClearTasksAll}>
            Limpar tudo
          </button> 
        </div>
}
      {/* )        
      
    })} */}
        
        
      
      
         
     
  
   
        
    </div>
  )
}

export default App

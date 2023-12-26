import { Circle, Trash2, CheckCircle2 } from 'lucide-react'
import styles from './tasks.module.css'
import { ITasks } from '../../App';

// Tudo que varia de uma task para outra.
// tasks {ID: number, status: "", content: ""}

interface Props{
  tasks: ITasks;
  taskQuantity: number;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function Tasks({ tasks, onDelete, onComplete } :Props){
  
  return(
    <div className={styles.content}>
  
      <div className={styles.taskList}>

        <div className={styles.contentTask}>
          <button 
            title='check' 
            className={styles.btnCheck} 
            onClick={() => onComplete(tasks.id)}
          >
              

            { tasks.status 
            ? <CheckCircle2 
                className={styles.btnCompleted}
                size={20}
              /> 

            : <Circle 
                className={styles.btnNotCompleted}
                size={20}            
              /> 
            }
          
          </button>

          <p className={tasks.status ? styles.taskCompleted : "" }>{tasks.content}</p>
          
        </div>
        
        <button     
          onClick={() => onDelete(tasks.id)}     
          title='Delet task' 
          className={styles.btnTrash}
        >
          <Trash2
            size={15}
          />
        </button>
      
      </div>

    </div>
  )
}
import { Circle, ClipboardList, Trash2 } from 'lucide-react'
import styles from './tasks.module.css'
import { ITasks } from '../../App';

// Tudo que varia de uma task para outra.
// tasks {ID: number, status: "", content: ""}

interface Props{
  tasks: ITasks;
  onDelete: (taskId: string) => void;
}


export function Tasks({ tasks, onDelete } :Props){
  
  return(
    <div className={styles.content}>
      {/* Empty Task */}
{/*     
      <div className={styles.taskListEmpty}>
        <ClipboardList
          size={60}
        />
        <p>Você ainda não tem tarefas cadastradas</p>
        <span>Crie tarefas e organize seus itens a fazer</span>

      </div> */}

      {/* TaskList */}

      <div className={styles.taskList}>

        <div className={styles.contentTask}>
          <button title='check' className={styles.btnCircle}>
            <Circle className={styles.btnCircleHover}
              size={15}            
            />

          
          </button>
  
           {tasks.content}
           
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
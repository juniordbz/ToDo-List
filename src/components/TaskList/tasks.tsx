import { Circle, ClipboardList, Trash2 } from 'lucide-react'
import styles from './tasks.module.css'

export function TaskEmpty(){
  return(
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.count}>
          <p>Tarefas criadas</p>
          <span>5</span>
        </div>
        <div className={styles.count}>
          <p className={styles.textPurple}>Concluídas</p>
          <span>2 de 5</span>
        </div>
      </div>
      
      {/* Empty Task */}
    
      <div className={styles.taskListEmpty}>
        <ClipboardList
          size={60}
        />
        <p>Você ainda não tem tarefas cadastradas</p>
        <span>Crie tarefas e organize seus itens a fazer</span>

      </div>

      {/* TaskList */}

      <div className={styles.taskList}>
        <button title='check' className={styles.btnCircle}>
          <Circle className={styles.btnCircleHover}
            size={15}
          />
        </button>
        <p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
        <button title='Delet task' className={styles.btnTrash}>
          <Trash2
            size={15}
          />
        </button>
       
      </div>
    </div>
  )
}
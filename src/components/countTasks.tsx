import styles from './countTasks.module.css';

interface Props{
  taskQuantity: number;
  completedTask: number;
}

export function CountTasks({taskQuantity, completedTask }:Props){


  return(
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.count}>
          <p>Tarefas criadas</p>
          <span>{taskQuantity}</span>
        </div>
        <div className={styles.count}>
          <p className={styles.textPurple}>Concluídas</p>
          <span>{completedTask} de {taskQuantity}</span>
        </div>
      </div>
    </div>
  );
}
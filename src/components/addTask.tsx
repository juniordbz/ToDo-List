import { useState } from 'react';
import styles from './addTask.module.css';
import { PlusCircle } from 'lucide-react';


export function Task(){



  return(
    <div>
      <form className={styles.form}>
        <textarea placeholder='Adicione uma nova tarefa'/>
        <button 
        className={styles.btn}
        type='submit'>
          <p>Criar</p>
          <PlusCircle
          size={15}
          />
        </button>
      </form>
    </div>
  )
}

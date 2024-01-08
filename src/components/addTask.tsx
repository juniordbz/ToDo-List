import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './addTask.module.css';
import { PlusCircle } from 'lucide-react';

interface Props{
  onAddTask: (taskContent: string) => void;
}


export function AddTask({onAddTask}:Props){


  const [content, sentContent] = useState("");

  const contentEmpty = content.length === 0;

  function handleSubmit(event: FormEvent){
    event.preventDefault();
    onAddTask(content);
    sentContent(''); 
  }

  function onChangeContent(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    sentContent(event.target.value);
  }

  function handleNewTaskInvalid(event:ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Por favor digite uma tarefa');
  }

  return(
    <div>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <textarea 
          onChange={onChangeContent}
          value={content}
          name='task'
          placeholder='Adicione uma nova tarefa'
          required
          onInvalid={handleNewTaskInvalid}
        />
        <button 
          className={styles.btn}
          type='submit'
          disabled={contentEmpty}
        >
          <p>Criar</p>
          <PlusCircle
              size={15}
          />
        </button>
      </form>
    </div>
  )
}

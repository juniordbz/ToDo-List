import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react'
import styles from './addTask.module.css'
import { PlusCircle } from 'lucide-react'

interface Props {
  onAddTask: (taskContent: string) => void
}

export function AddTask({ onAddTask }: Props) {
  const [content, sentContent] = useState('')

  const contentEmpty = content.length === 0

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (content !== '') {
      onAddTask(content)
      sentContent('')
    }
  }

  function onChangeContent(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    sentContent(event.target.value)
  }

  // função de segurança, botão desabilitado caso o campo esteja vazio
  function handleNewTaskInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Por favor digite uma tarefa')
  }

  function handleEnterKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          onChange={onChangeContent}
          value={content}
          name="task"
          placeholder="Adicione uma nova tarefa"
          required
          onInvalid={handleNewTaskInvalid}
          onKeyDown={handleEnterKey}
        />
        <button className={styles.btn} type="submit" disabled={contentEmpty}>
          <p>Criar</p>
          <PlusCircle size={15} />
        </button>
      </form>
    </div>
  )
}

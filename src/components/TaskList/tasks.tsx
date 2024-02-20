import { Circle, Trash2, CheckCircle2 } from 'lucide-react'
import styles from './tasks.module.css'
import { ITasks } from '../../App'
import { useEffect, useRef, useState } from 'react'

// Tudo que varia de uma task para outra.
// tasks {ID: number, status: "", content: ""}

interface Props {
  tasks: ITasks
  taskQuantity: number
  onDelete: (taskId: string) => void
  onComplete: (taskId: string) => void
  onEdit: (taskId: string, newContent: string) => void
}

export function Tasks({ tasks, onDelete, onComplete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(tasks.content)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleStartEditing = () => {
    setIsEditing(true)
    setNewContent(tasks.content)
  }

  const handleSaveEdit = () => {
    onEdit(tasks.id, newContent)
    setIsEditing(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveEdit()
    } else if (event.key === 'Escape') {
      setIsEditing(false)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      handleSaveEdit()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <div className={styles.containerTask}>
          <button
            title="check"
            className={styles.btnCheck}
            onClick={() => onComplete(tasks.id)}
          >
            {tasks.status ? (
              <CheckCircle2 className={styles.btnCompleted} size={20} />
            ) : (
              <Circle className={styles.btnNotCompleted} size={20} />
            )}
          </button>
          {isEditing ? (
            <input
              className={styles.inputContent}
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          ) : (
            <div className={styles.content} onClick={handleStartEditing}>
              <p className={tasks.status ? styles.taskCompleted : styles.taksP}>
                {tasks.content}
              </p>
            </div>
          )}
        </div>

        <button
          className={styles.btnTrash}
          onClick={() => onDelete(tasks.id)}
          title="Delet task"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

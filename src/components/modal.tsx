import styles from './modal.module.css'
import * as Dialog from '@radix-ui/react-dialog'

interface ModalProps {
  setOpen: (open: boolean) => void
  deleteTask: () => void
}

export function Modal({ setOpen, deleteTask }: ModalProps) {
  return (
    <Dialog.DialogPortal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Close>X</Dialog.Close>
        <span>Tem certeza que deseja limpar toda a lista de tarefas?</span>

        <button
          onClick={() => {
            deleteTask()
            setOpen(false)
          }}
        >
          Confirmar
        </button>
        <button onClick={() => setOpen(false)}>Cancelar</button>
      </Dialog.Content>
    </Dialog.DialogPortal>
  )
}

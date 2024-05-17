import { X } from 'lucide-react'
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
        <Dialog.Close className={styles.close}>
          <X size={20} />
        </Dialog.Close>
        <span className={styles.text}>
          Tem certeza que deseja limpar toda a lista de tarefas?
        </span>

        <div className={styles.btnContainer}>
          <button
            className={styles.btnConfirmar}
            onClick={() => {
              deleteTask()
              setOpen(false)
            }}
          >
            Confirmar
          </button>
          <button className={styles.btnCancel} onClick={() => setOpen(false)}>
            Cancelar
          </button>
        </div>
      </Dialog.Content>
    </Dialog.DialogPortal>
  )
}

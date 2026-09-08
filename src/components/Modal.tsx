import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Modal.module.scss';

type ModalVariant = 'default' | 'caution' | 'success';

interface ModalProps {
  message: ReactNode;
  onClose: () => void;
  variant?: ModalVariant;
}

const Modal: React.FC<ModalProps> = ({
  message,
  onClose,
  variant = 'default',
}) => {
  return (
    <div className={styles.blockModal} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={styles.innerModal}>
        <div
          className={clsx(styles.itemMessage, {
            [styles.wrapCaution]: variant === 'caution',
            [styles.wrapSuccess]: variant === 'success',
          })}
        >
          {message}
        </div>
        <button type="button" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default Modal;

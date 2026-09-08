import { useEffect, useRef } from 'react';
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={styles.blockModal}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="問い合わせフォームのメッセージ"
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.innerModal}>
        <div
          className={clsx(styles.itemMessage, {
            [styles.wrapCaution]: variant === 'caution',
            [styles.wrapSuccess]: variant === 'success',
          })}
        >
          {message}
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="メッセージを閉じる"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default Modal;

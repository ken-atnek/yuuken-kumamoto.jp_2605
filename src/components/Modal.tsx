/* =======================================
 * 株式会社 雄建 問い合わせ結果モーダル
 * URL: /src/components/Modal.tsx
 * Referenced in: /src/components/Top/ContainerContact.tsx
 * Created: 2026-04-04
 * Last updated: 2026-09-08
 * ======================================= */

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
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
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

/* =======================================
 * 株式会社 雄建  CONTACT
 * URL:src/components/Top/ContainerContact.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import clsx from 'clsx';
import Modal from '@/components/Modal';
import type { ReactNode } from 'react';
import { useState, useRef } from 'react';

const endpoint = '/backend/contact.php';

type ContactApiResponse =
  | { success: true; message?: string }
  | { success: false; error: string };

type ModalVariant = 'default' | 'caution' | 'success';

// ✅ 未入力ハイライト用
type InvalidKey =
  | 'name'
  | 'furigana'
  | 'address'
  | 'email'
  | 'phone'
  | 'message';

export default function ContainerContact() {
  const [referral, setReferral] = useState('');
  const [name, setName] = useState('');
  const [furigana, setFurigana] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const formRef = useRef<HTMLFormElement | null>(null);

  const scrollToFormTop = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // ✅ モーダル一本化（B）
  const [modalMessage, setModalMessage] = useState<ReactNode | null>(null);
  const [modalVariant, setModalVariant] = useState<ModalVariant>('default');

  const openModal = (node: ReactNode, variant: ModalVariant = 'default') => {
    setModalVariant(variant);
    setModalMessage(node);
  };

  const closeModal = () => {
    setModalMessage(null);
    setModalVariant('default');
  };

  const [loading, setLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // ✅ 未入力フィールドの枠線ハイライト管理
  const [invalidKeys, setInvalidKeys] = useState<InvalidKey[]>([]);

  const isInvalid = (key: InvalidKey) => invalidKeys.includes(key);

  const clearInvalid = (key: InvalidKey) => {
    setInvalidKeys((prev) => prev.filter((k) => k !== key));
  };

  const clearAllInvalid = () => setInvalidKeys([]);

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = (v: string) => v.trim() === '';
    const missingLabels: string[] = [];
    const invalid: InvalidKey[] = [];

    if (isEmpty(name)) {
      missingLabels.push('お名前');
      invalid.push('name');
    }
    if (isEmpty(furigana)) {
      missingLabels.push('ふりがな');
      invalid.push('furigana');
    }
    if (isEmpty(address)) {
      missingLabels.push('住所');
      invalid.push('address');
    }
    if (isEmpty(email)) {
      missingLabels.push('メールアドレス');
      invalid.push('email');
    }
    if (isEmpty(phone)) {
      missingLabels.push('電話番号');
      invalid.push('phone');
    }
    if (isEmpty(message)) {
      missingLabels.push('お問い合わせ内容');
      invalid.push('message');
    }

    if (invalid.length > 0) {
      setInvalidKeys(invalid);

      scrollToFormTop();

      openModal(
        <>
          <h6>必須項目を入力してください</h6>
          <p>未入力の項目があります。以下をご確認ください。</p>
          <ul>
            {missingLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </>,
        'caution'
      );
      return;
    }

    // ✅ すべてOKならハイライト解除
    clearAllInvalid();
    setIsConfirming(true);

    window.requestAnimationFrame(() => {
      scrollToFormTop();
    });
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConfirming(false);
    closeModal();
    window.requestAnimationFrame(() => {
      scrollToFormTop();
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    closeModal();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('referral', referral);
    formData.append('furigana', furigana);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const raw = await response.text();

      let result: ContactApiResponse;

      try {
        result = JSON.parse(raw) as ContactApiResponse;
      } catch {
        openModal('サーバーの応答形式が不正です。', 'caution');
        return;
      }

      // HTTPエラー
      if (!response.ok) {
        if (!result.success) {
          openModal(result.error, 'caution');
        } else {
          openModal('送信に失敗しました。', 'caution');
        }
        return;
      }

      // アプリケーションエラー
      if (!result.success) {
        openModal(result.error, 'caution');
        return;
      }

      // 成功
      setReferral('');
      setName('');
      setFurigana('');
      setAddress('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsConfirming(false);
      clearAllInvalid();

      openModal(
        <>
          <h6>送信完了</h6>
          {result.message ? <p>{result.message}</p> : null}
        </>,
        'success'
      );
      window.setTimeout(() => closeModal(), 3000);
    } catch (error) {
      console.error('エラー:', error);
      openModal('通信エラーが発生しました。', 'caution');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.containerContact} id="ContainerContact">
        <h2>contact･recruit</h2>
        <form
          ref={formRef}
          className={styles.blockForm}
          noValidate
          onSubmit={isConfirming ? handleSubmit : handleConfirm}
        >
          <p className={styles.headAnnounce}>
            業務ご依頼のお問い合わせ、求人に関するお問い合わせは
            <br />
            下記フォームよりご連絡ください。
            <br />
            メールまたはお電話にて3営業日以内にご連絡させていただきます。
          </p>
          {isConfirming ? (
            // ✅ 確認画面
            <div className={styles.statusConfirm}>
              <p className={styles.announce}>入力内容を確認してください。</p>

              <dl>
                <div>
                  <dt>どなたのご紹介ですか？</dt>
                  <dd>{referral || '未選択'}</dd>
                </div>
                <div>
                  <dt>お名前</dt>
                  <dd>{name}</dd>
                </div>
                <div>
                  <dt>ふりがな</dt>
                  <dd>{furigana}</dd>
                </div>
                <div>
                  <dt>住所</dt>
                  <dd>{address}</dd>
                </div>
                <div>
                  <dt>メールアドレス</dt>
                  <dd>{email}</dd>
                </div>
                <div>
                  <dt>電話番号</dt>
                  <dd>{phone}</dd>
                </div>
                <div>
                  <dt className={styles.positionTop}>お問い合わせ内容</dt>
                  <dd>{message}</dd>
                </div>
              </dl>
              <div className={styles.box_btn}>
                <button
                  type="button"
                  onClick={handleEdit}
                  disabled={loading}
                  className={styles.btnBack}
                >
                  <span>修正</span>
                  <i></i>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.btnSub}
                >
                  <span>{loading ? '送信中…' : '送信'}</span>
                  <i></i>
                </button>
              </div>
            </div>
          ) : (
            // ✅ 入力画面
            <div className={styles.boxForm}>
              <dl>
                <div className={styles.boxIntro}>
                  <dt>
                    <label htmlFor="contact-referral">
                      どなたのご紹介ですか？
                    </label>
                  </dt>
                  <dd>
                    <select
                      id="contact-referral"
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                    >
                      <option value="">選択してください</option>
                      <option value="知人・友人">知人・友人</option>
                      <option value="取引先">取引先</option>
                      <option value="SNS">SNS</option>
                      <option value="検索エンジン">検索エンジン</option>
                    </select>
                  </dd>
                </div>
                <div>
                  <dt>
                    <label htmlFor="contact-name">お名前</label>
                  </dt>
                  <dd>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => clearInvalid('name')}
                      className={clsx({
                        [styles.isInvalid]: isInvalid('name'),
                      })}
                      required
                      placeholder="お名前を入力してください"
                      autoComplete="name"
                    />
                  </dd>
                </div>
                <div>
                  <dt>
                    <label htmlFor="contact-furigana">ふりがな</label>
                  </dt>
                  <dd>
                    <input
                      id="contact-furigana"
                      type="text"
                      value={furigana}
                      onChange={(e) => setFurigana(e.target.value)}
                      onFocus={() => clearInvalid('furigana')}
                      className={clsx({
                        [styles.isInvalid]: isInvalid('furigana'),
                      })}
                      required
                      placeholder="ふりがなを入力してください"
                      autoComplete="off"
                    />
                  </dd>
                </div>
                <div>
                  <dt>
                    <label htmlFor="contact-address">住所</label>
                  </dt>
                  <dd>
                    <input
                      id="contact-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onFocus={() => clearInvalid('address')}
                      className={clsx({
                        [styles.isInvalid]: isInvalid('address'),
                      })}
                      required
                      placeholder="住所を入力してください"
                      autoComplete="street-address"
                    />
                  </dd>
                </div>
                <div>
                  <dt>
                    <label htmlFor="contact-phone">電話番号</label>
                  </dt>
                  <dd>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => clearInvalid('phone')}
                      className={clsx({
                        [styles.isInvalid]: isInvalid('phone'),
                      })}
                      required
                      placeholder="お電話番号を入力してください"
                      autoComplete="tel"
                    />
                  </dd>
                </div>
                <div>
                  <dt>
                    <label htmlFor="contact-email">メールアドレス</label>
                  </dt>
                  <dd>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => clearInvalid('email')}
                      className={clsx({
                        [styles.isInvalid]: isInvalid('email'),
                      })}
                      required
                      placeholder="メールアドレスを入力してください"
                      autoComplete="email"
                    />
                  </dd>
                </div>

                <div>
                  <dt className={styles.positionTop}>
                    <label htmlFor="contact-message">お問い合わせ内容</label>
                  </dt>
                  <dd>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => clearInvalid('message')}
                      className={clsx({
                        [styles.isInvalid]: isInvalid('message'),
                      })}
                      required
                      placeholder="お問い合わせ内容を入力してください"
                    />
                  </dd>
                </div>
              </dl>

              <div className={styles.box_btn}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.btnSub}
                >
                  <span>確認</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
      {/* ✅ モーダル表示 */}
      {modalMessage && (
        <Modal
          variant={modalVariant}
          onClose={closeModal}
          message={modalMessage}
        />
      )}
    </>
  );
}

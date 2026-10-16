import { useEffect, useRef, type ReactNode } from 'react';
export function Modal({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} onCancel={onClose} aria-label={label} className="collection-dialog">{children}</dialog>;
}

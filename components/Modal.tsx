import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss'

// Ensure only one modal open at a time;
let modalIsOpen = false;
const MODAL_ID = "THE-MODAL";

interface ModalProps {
  children: React.ReactNode;
  closeModal?: () => void;
}

export default function Modal({children, closeModal} : ModalProps) {
  useEffect(() => {
    modalOpen();
    return () => modalClosed();
  }, [])

  function preventBubbleUp(e : React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <>
      { createPortal(
          <div id={MODAL_ID} className={styles.overlay} onClick={closeModal ? closeModal : () => {}}>
            <div className={styles.container} onClick={preventBubbleUp}>
              {children}
            </div>
          </div>,
          document.body
      )}
    </>
  )
}

/**
 * Modal Open/Close
 * - Add overlay
 * - Prevent body scrolling
 * - Prevent interaction with things outside of modal.
 *   = Extremely basic focus trap for our use case.
 *   = We don't need to worry about accessibility for LC players.
 */
const FOCUSABLE = "input:not([disabled])";
let focusRemoved : [Element, string | null][] = [] ;

function modalOpen() {
  modalIsOpen = true;
  if (!document) return;

  document.body.style.overflow = 'hidden';

  const main = document.querySelector('main');
  if (!main) return;

  const focusableElements = main.querySelectorAll(FOCUSABLE);
  focusableElements.forEach(elem => {
    const original = elem.getAttribute("tabindex");
    elem.setAttribute("tabindex", "-1");

    focusRemoved.push([elem, original])
  });
}

function modalClosed() {
  modalIsOpen = false;
  if (!document) return;

  document.body.style.overflow = 'unset';
  for (const [elem, original] of focusRemoved) {
    if (original) {
      elem.setAttribute("tabindex", original);
    } else {
      elem.removeAttribute("tabindex");
    }
  }

  focusRemoved = [];
}

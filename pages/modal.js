import React from 'react';
import Styles from '@/styles/Modal.module.css'; // Create a CSS module for styling the modal

export default function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className={Styles.modalOverlay}>
      <div className={Styles.modalContent}>
        <button className={Styles.closeButton} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

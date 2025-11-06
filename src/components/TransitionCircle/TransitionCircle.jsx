import React from 'react';
import './TransitionCircle.css';
import { useTransitionOverlay } from '../../hooks/useTransition';

export default function TransitionCircle() {
  const { isOpen, title } = useTransitionOverlay();
  if (!isOpen) return null;

  return (
    <div
      className="tc-overlay"
      aria-hidden="true"
    >
      <p className="tc-title">{title}</p>
    </div>
  );
}



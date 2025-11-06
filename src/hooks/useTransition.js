import { useContext } from 'react';
import { TransitionContext } from '../context/TransitionContext';

export function useTransitionOverlay() {
  return useContext(TransitionContext);
}



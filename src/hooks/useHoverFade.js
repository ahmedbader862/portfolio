// src/hooks/useHoverFade.js
import { useState } from 'react';

/**
 * Hook لإدارة الشفافية التدريجية عند الـ hover (للعناصر أو الأحرف)
 * @param {Array} items - مصفوفة العناصر (مثل lines أو projects)
 * @param {number} baseOpacity - الشفافية الأساسية للأحرف (افتراضي: 0.9)
 * @param {number} maxDim - أقصى وضوح للأحرف غير المُهوّرة (افتراضي: 0.36)
 * @param {number} minDim - أدنى وضوح للأحرف غير المُهوّرة (افتراضي: 0.08)
 * @returns {Object} - { hovered, getOpacity, getLetterOpacity, handleMouseEnter, handleMouseLeave }
 */
const useHoverFade = (items, baseOpacity = 0.9, maxDim = 0.36, minDim = 0.08) => {
  const [hovered, setHovered] = useState(null);

  // حساب الشفافية للعنصر ككل (مفيد للعناصر البسيطة)
  const getOpacity = (index) => {
    if (hovered === null) return baseOpacity;
    if (hovered === index) return 1;
    
    const distance = Math.abs(index - hovered);
    return Math.max(baseOpacity - distance * 0.1, minDim);
  };

  // حساب الشفافية لكل حرف (مفيد للنصوص المفصولة إلى أحرف)
  const getLetterOpacity = (index, letterIndex, length) => {
    if (hovered === null) {
      // لا hover: شفافية أساسية
      return baseOpacity;
    }
    if (hovered === index) {
      // العنصر المُهوّر: شفافية كاملة
      return 1;
    }
    // غير مُهوّر: شفافية تدريجية بناءً على الموقع
    const ratio = length > 1 ? letterIndex / (length - 1) : 0;
    return Math.max(minDim, maxDim - ratio * (maxDim - minDim));
  };

  // Handlers للـ mouse events
  const handleMouseEnter = (index) => () => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  return {
    hovered,
    getOpacity,
    getLetterOpacity, // جديد: لحساب شفافية الأحرف
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useHoverFade;
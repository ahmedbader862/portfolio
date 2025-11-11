import React from 'react';
import './Input.css';

export default function Input({ fieldNum, title, name, placeholder, type = "text", rows }) {
  const InputElement = rows ? 'textarea' : 'input';
  
  return (
    <label className="field">
      <div className="field-box">
        <span className="field-num">{fieldNum.toString().padStart(2, '0')}</span>
        <span className="field-title">{title}</span>
        <InputElement 
          name={name}
          placeholder={placeholder}
          rows={rows}
          type={type}
        />
      </div>
    </label>
  );
}
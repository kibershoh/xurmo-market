import React, { useState } from 'react';

function NumberInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    let formattedValue = formatInput(inputValue);
    setValue(formattedValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      let inputValue = value.substring(0, value.length - 1).replace(/\D/g, '');
      let formattedValue = formatInput(inputValue);
      setValue(formattedValue);
    }
  };

  const formatInput = (inputValue) => {
    let formattedValue = '';
    if (inputValue.length >= 4 && inputValue.length <= 20) {
      formattedValue = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    } else if (inputValue.length > 8) {//10 000 000
      formattedValue = inputValue.replace(/(\d{1,})(\d{1})/, '$1 $2');
    } else {
      formattedValue = inputValue;
    }
    return formattedValue;
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter a number"
    />
  );
}

export default NumberInput;

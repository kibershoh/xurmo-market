import React, { useState } from 'react';
import styles from './styles.module.scss'
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdown_toggle} onClick={toggleDropdown}>
        Dropdown
      </button>
      {isOpen && (
        <ul className={styles.dropdown_menu}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

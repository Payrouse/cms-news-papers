import Link from 'next/link';
import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={(state) => {
        setIsOpen(state.isOpen);
      }}
    >
      <Link href="/admin">
        <a
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Inicio
        </a>
      </Link>
      <Link href="/admin/editor">
        <a
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Redacción
        </a>
      </Link>
      <Link href="/admin/publish">
        <a
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Revisión
        </a>
      </Link>
      
    </Menu>
  );
};

export default Slidebar;

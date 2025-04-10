import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = ({ storeData }) => {
  return (
    <header className="bg-primary py-4">
      <div className="container">
        <div className="flex justify-center items-center">
          <Link href="/" className="block">
            <Image 
              src="/logo.png" 
              alt="Rede Única de Baterias" 
              width={180} 
              height={60}
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
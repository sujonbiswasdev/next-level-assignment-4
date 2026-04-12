import React from 'react';
import Link from 'next/link';

interface NotfounddataProps {
  content: string;
  filter?: string;
  emoji?: React.ReactNode;
  path?: string;
  btntext?: string;
}

const Notfounddata: React.FC<NotfounddataProps> = ({
  content,
  filter,
  emoji,
  path,
  btntext,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-12 px-4 rounded-xl shadow animate-fade-in bg-white dark:bg-gray-900 transition">
      <div className="flex flex-col items-center">
        <span className="text-6xl mb-4 drop-shadow-lg select-none">
          {emoji ?? '😔'}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {content}
        </h3>
        {filter && (
          <p className="text-gray-500 dark:text-gray-400 text-base mb-4">
            {filter}
          </p>
        )}

         <Link href={`${path}`}>
       {btntext }
       </Link>
        
      
      </div>
    </div>
  );
};

export default Notfounddata;

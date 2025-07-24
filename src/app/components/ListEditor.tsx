'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ListEditor(){
    
  const [newEntry, setNewEntry] = useState('');

  return (
    <div>
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[8px] row-start-2 items-center sm:items-start">
                <div>
                    <label htmlFor="password">
                    Name
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="List item"
                    value={newEntry}
                    className='ml-4 mr-4 w-20'
                    onChange={(e) => setNewEntry(e.target.value)}
                    />
                    <button
                        className="gap-2 hover:bg-[#d4d4d4] dark:hover:bg-[#202020] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                    >
                        Close
                    </button>
                    <button
                        className="gap-2 hover:bg-[#d4d4d4] dark:hover:bg-[#202020] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                    >
                        Delete
                    </button>
                </div>
            </main>
        </div>
    </div>
  );
}
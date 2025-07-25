'use client';

import { ListItem } from '@/generated/prisma'
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [entries, setEntries] = useState<ListItem[]>([]);


    useEffect(() => {
        loadEntries();
    }, []);
    const loadEntries= async ()=>
    {
        //setEntries([]);
        const entryData = await fetch("api/list/limited", {
            method:'GET'
        })
        setEntries(await entryData.json());
    };

    const removeOne= async (id:number, current:number)=>
    {
        await fetch("api/list/"+id, {
            method:'POST',
            body: JSON.stringify({count:current-1})
        })
        loadEntries();
    };

    return (
        <div>
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[8px] row-start-2 items-center sm:items-start">
                    <div>
                        {
                            entries.length===0 ? 
                            (
                                <p>
                                    No Entries
                                </p>
                            ) : (
                                
                        <div>
                            {entries.map(e => (
                                <div key={e.id}>
                                    <div
                                        className='flex w-100'
                                    >
                                        <p
                                            className='flex-1'
                                        >
                                            {e.name}
                                        </p>
                                        <p
                                            className='flex-none'
                                        >
                                            {e.count}
                                        </p>
                                        <button
                                            className="flex-none gap-2 hover:bg-[#d4d4d4] dark:hover:bg-[#202020] font-medium text-sm sm:text-base h-8 sm:h-12 px-2 sm:px-3 sm:w-auto"
                                            onClick={()=>removeOne(e.id, e.count)}
                                        >
                                            Remove 1
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                            )
                        }
                    </div>
                    <div className='mt-5'>
                        <Link href='/edit_list'>
                            Edit List
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

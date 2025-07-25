'use client';

import { ListItem } from '@/generated/prisma';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ListEditorPage() {
    const [entries, setEntries] = useState<ListItem[]>([]);
    const [newEntry, setNewEntry] = useState('');


    useEffect(() => {
        loadEntries();
    }, []);
    const loadEntries= async ()=>
    {
        //setEntries([]);
        const entryData = await fetch("api/list", {
            method:'GET'
        })
        setEntries(await entryData.json());
    };

    const addOne= async (id:number, current:number)=>
    {
        await fetch("api/list/"+id, {
            method:'POST',
            body: JSON.stringify({count:current+1})
        })
        loadEntries();
    };

    const removeOne= async (id:number, current:number)=>
    {
        await fetch("api/list/"+id, {
            method:'POST',
            body: JSON.stringify({count:current-1})
        })
        loadEntries();
    };

    const createEntry = async () =>
    {
        await fetch("api/list", {
            method:'POST',
            body:JSON.stringify({name:newEntry})
        })
        loadEntries();
    }
    

    const deleteEntry= async (id:number)=>
    {
        await fetch("api/list/"+id, {
            method:'DELETE'
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
                            (<p>
                                Loading List...
                            </p>):
                            (
                                <div>
                                    {entries.map(e=>(
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
                                            </div>
                                            <button
                                                className="gap-2 hover:bg-[#d4d4d4] dark:hover:bg-[#202020] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                                                onClick={()=>addOne(e.id, e.count)}
                                            >
                                                Add 1
                                            </button>
                                            <button
                                                className="gap-2 hover:bg-[#d4d4d4] dark:hover:bg-[#202020] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                                                onClick={()=>removeOne(e.id, e.count)}
                                            >
                                                Remove 1
                                            </button>
                                            <button
                                                className="gap-2 hover:bg-[#d4d4d4] dark:hover:bg-[#202020] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                                                onClick={()=>deleteEntry(e.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                        <div>

                        </div>
                    </div>
                    <hr className="my-1 h-1 border-t-1 bg-white/10 dark:bg-neutral-100" />
                    <div>
                        <label htmlFor="password">
                            Name
                        </label>
                        <input
                            id="entryName"
                            name="entryName"
                            required
                            placeholder="List item"
                            value={newEntry}
                            className='ml-4 mr-4 w-50'
                            onChange={(e) => setNewEntry(e.target.value)}
                        />
                        <button
                            className="gap-2 hover:bg-[#d4d4d4] dark:hover:bg-[#202020] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                            onClick={()=>createEntry()}
                        >
                            Create
                        </button>
                    </div>
                    
                    <div className='mt-5'>
                        <Link href='/'>
                            Back
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

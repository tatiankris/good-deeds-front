'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const paginationArray  = []
  for (let i = 0; i < totalPages; i++) {
    paginationArray[i] = i + 1
  }
  return <div className={'flex flex-row justify-center items-center mt-20'}>
    {
    paginationArray.map((num) => {
      return <Link key={num} href={createPageURL(num)}>
        <button className={`flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage == num ? "text-blue-600" : "text-gray-600"}`}>{num}</button>
      </Link>
    })
  }
  </div>
}
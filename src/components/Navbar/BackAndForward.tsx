import { ArrowLeft, ArrowRight } from 'lucide-react';

export function BackAndForward() {
  return (
    <div className='flex gap-5'>
      <div className='hover:bg-gray-100 p-2 rounded-full cursor-pointer'>
        <ArrowLeft/>
      </div>
      <div className='hover:bg-gray-100 p-2 rounded-full cursor-pointer'>
        <ArrowRight/>
      </div>
    </div>
  )
}
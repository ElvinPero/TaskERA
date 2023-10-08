import React from 'react'

const Task = ({
    title,
    description,
    isCompleted,
    updateHandler,
    deleteHandler,
    id,
  }) => {
  return (
    <>
  
  {/* <div class="max-w-7xl mx-auto"> */}
    <div class=" relative group w-half">
      <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div class="relative px-4 py-8 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex justify-around items-top space-x-6">
       {/* <div className='flex justify-end  '> */}
      <div className='flex flex-row justify-start gap-4'>
            {/* <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
            </svg> */}


        <input className='w-10'
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
            
            <div class="space-y-2">
                <h1 className='font-bold'>{title}</h1>
              <p class="text-slate-800">{description}</p>
            </div>
        </div>
        <div className='justify-self-end'>
            <button onClick={() => deleteHandler(id)} type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
             <span class="sr-only">Dismiss</span>
             <svg class="h-10 w-10 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
               <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
             </svg>
            </button>
        </div> 

      </div>
    

   
    
  </div>

  {/* </div> */}

    </>
  )
}

export default Task
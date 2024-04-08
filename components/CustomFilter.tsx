'use client'

import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'

const CustomFilter = ({ title, options, setFilter }: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0]);

  // server side
  // const router = useRouter();

  // const handleUpdateParams = (e: { title: string, value: string }) => {
  //   const newPath = updateSearchParams(title, e.value.toLowerCase());

  //   router.push(newPath, {scroll: false});
  //   router.refresh();
  // }

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          setFilter(e.value);
        }}
      >
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>
              {selected.title}
            </span>
            <Image 
              src='/chevron-up-down.svg' 
              height={20} 
              width={20}
              className='ml-4 object-contain'
              alt='chevron up down' 
            />
          </Listbox.Button>

          <Transition 
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {options.map(opt => (
                <Listbox.Option
                  key={opt.title}
                  value={opt}
                  className={({ active }) => `relative cursor-default
                  select-none py-2 px-4 ${
                    active 
                    ? 'bg-primary-blue text-white'
                    : 'text-gray-900'
                  }`}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}>
                      {opt.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter
import React, { useState } from 'react'
import Categories from './Categories'
import { Btn } from 'components'
import { BiMessageSquareAdd } from 'react-icons/bi'


function Page() {
    const [ activeCategory, setActiveCategory ] = useState(null)
    const [ modalMode, setModalMode ] = useState(null)


    return (
        <div className='py-5 px-10'>
            <div className='flex border-b justify-between items-center'>
                <Categories activeCategory={ activeCategory } setActiveCategory={ setActiveCategory } />
                <Btn onClick={() => setModalMode("addTopic")} className="mt-5 flex gap-2 items-center justify-between">
                    <BiMessageSquareAdd size={ 20 }/>
                    Add Topic
                </Btn>
            </div>
        </div>
    )
}

export default Page
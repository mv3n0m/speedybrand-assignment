import React, { useState } from 'react'
import Categories from './Categories'
import { Btn } from 'components'
import { BiMessageSquareAdd } from 'react-icons/bi'
import AddModal from './AddModal'
import TopicsList from './TopicsList'


function Page() {
    const [ activeCategory, setActiveCategory ] = useState(null)
    const [ modalMode, setModalMode ] = useState(null)

    const ModalOption = {
        addTopic: AddModal
    }[ modalMode ]

    const modalProps = { setModalMode, setActiveCategory }
    const topicsListProps = { activeCategory, setActiveCategory, setModalMode }

    return (
        <div className='py-5 px-10'>
            <div className='flex border-b justify-between items-center'>
                <Categories activeCategory={ activeCategory } setActiveCategory={ setActiveCategory } />
                <Btn onClick={() => setModalMode("addTopic")} className="mt-5 flex items-center justify-between">
                    <BiMessageSquareAdd size={ 20 }/>
                    Add Topic
                </Btn>
            </div>
            <TopicsList { ...topicsListProps } />
            { modalMode && <ModalOption { ...modalProps } /> }
        </div>
    )
}

export default Page
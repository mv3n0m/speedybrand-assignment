import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import { Btn } from 'components'
import { BiMessageSquareAdd } from 'react-icons/bi'
import AddModal from './AddModal'
import TopicsList from './TopicsList'
import EditorModal from './EditorModal'
import Request from 'helpers/Request'


function Page() {
    const [ activeCategory, setActiveCategory ] = useState(null)
    const [ modalMode, setModalMode ] = useState(null)
    const { modalKey, modalValues } = modalMode || {}
    const [ categories, setCategories ] = useState([])

    const fetchCategories = async () => {
        try {
            const { jsonResponse } = await Request("/fetch-categories")
            setCategories(jsonResponse.data)
        } catch (err) {
            console.log(err)
        }
    }

    const ModalOption = {
        addTopic: AddModal,
        editor: EditorModal
    }[ modalKey ]

    const modalProps = { setModalMode, setActiveCategory, modalValues, categories, fetchCategories }
    const topicsListProps = { activeCategory, setActiveCategory, setModalMode }

    useEffect(() => { fetchCategories() }, [])


    return (
        <div className='py-5 px-10'>
            <div className='flex border-b justify-between items-center'>
                <Categories activeCategory={ activeCategory } setActiveCategory={ setActiveCategory } categories={ categories }/>
                <Btn onClick={() => setModalMode({ modalKey: "addTopic" })} className="mt-5 flex items-center justify-between">
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
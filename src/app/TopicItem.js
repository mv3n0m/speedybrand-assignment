import React from 'react'
import Request from 'helpers/Request'
import { LuClipboardEdit } from 'react-icons/lu'
import { FiTrash2 } from 'react-icons/fi'
import Keywords from './Keywords'


function TopicItem(props) {
    const { setActiveCategory, topic, filterBy, setFilterBy, setModalMode } = props
    const { title, keywords, _id, category } = topic

    const deleteTopic = async () => {
        try {
            setActiveCategory(null)
            await Request("/delete-topic", { _id })
            setActiveCategory(category)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFilters = keyword => {
        if (!filterBy.includes(keyword)) setFilterBy([ ...filterBy, keyword ])
    }

    return (
        <div className='border-t py-4 px-3 flex items-center justify-between'>
            <div>
                <h6 className='text-orange-500 font-semibold mb-2'>
                    { title }
                </h6>
                <Keywords keywords={ keywords } onClickFn={ handleFilters }/>
            </div>
            <div className='w-[140px] flex justify-end gap-5 items-center'>
                <LuClipboardEdit size={ 25 }
                    className='text-blue-600 cursor-pointer hover:scale-105'
                    onClick={() => {
                        setModalMode({ modalKey: "editor", modalValues: { title, keywords, category }})
                    }}
                />
                <FiTrash2 size={ 25 } onClick={ deleteTopic }
                    className='text-red-600 cursor-pointer hover:scale-105'
                />
            </div>
        </div>
    )
}

export default TopicItem
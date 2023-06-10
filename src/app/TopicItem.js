import React from 'react'
import Request from 'helpers/Request'
import { LuClipboardEdit } from 'react-icons/lu'
import { FiTrash2 } from 'react-icons/fi'


function TopicItem(props) {
    const { setActiveCategory, topic, filterBy, setFilterBy } = props
    const { title, keywords, _id, category } = topic
    const keywordsColors = ["fuchsia", "green", "indigo", "yellow"]

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
                <h6 className='text-zinc-700'>
                    { title }
                </h6>
                <div className='flex gap-2 mt-2'>
                    {
                        keywords?.map((keyword, idx) => {
                            const color = keywordsColors[idx % keywordsColors.length]

                            return (
                                <div onClick={() => handleFilters(keyword)}
                                    className={ `cursor-pointer border-2 border-${ color }-400 text-${ color }-500 px-3 rounded-full hover:scale-105` }
                                >{ keyword }</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='w-[140px] flex justify-end gap-5 items-center'>
                <LuClipboardEdit size={ 25 } className='text-blue-600 cursor-pointer hover:scale-105' />
                <FiTrash2 size={ 25 } onClick={ deleteTopic }
                    className='text-red-600 cursor-pointer hover:scale-105'
                />
            </div>
        </div>
    )
}

export default TopicItem
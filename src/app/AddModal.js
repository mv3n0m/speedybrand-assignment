import React, { useState } from 'react'
import { Btn, Modal } from 'components'
import Request from 'services/Request'


function AddModal(props) {
    const { setModalMode, setActiveCategory } = props
    const [ isModalOpen, setIsModalOpen ] = useState(true)
    const [ title, setTitle ] = useState("")
    const [ keywords, setKeywords ] = useState("")

    const closeModal = () => {
        setModalMode(null)
        setIsModalOpen(false)
    }

    const addTopic = async () => {
        try {
            const payload = {
                title: title?.trim(),
                keywords: keywords?.split(",").filter(i => i?.length).map(i => i.trim())
            }
            await Request("/add-topic", payload)
            setActiveCategory("Custom")
            closeModal()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal handleClose={ closeModal } isOpen={ isModalOpen } className="bg-white rounded-md px-4 py-1">
            <h4 className='text-orange-600 font-semibold text-lg pb-4'>
                Add Topic
            </h4>
            <div className='flex items-center justify-between gap-5'>
                <span className='text-zinc-500 font-semibold'>Title: </span>
                <input placeholder='Enter title'
                    onChange={e => setTitle(e.target.value)}
                    className='border border-orange-400 rounded-md px-2 py-1 placeholder:text-zinc-400 w-[500px]'
                    required
                    />
            </div>
            <div className='flex items-start justify-between mt-5 gap-5'>
                <span className='text-zinc-500 font-semibold'>Keywords: </span>
                <textarea placeholder='Enter comma-separated values...'
                    className='border border-orange-400 rounded-md placeholder:text-zinc-400 p-2 w-[500px]'
                    rows={ 3 } cols={ 50 }
                    onChange={e => setKeywords(e.target.value)}
                    required
                    > </textarea>
            </div>
            <div className='text-right mt-5'>
                <Btn text="Add" disabled={ !title?.length || !keywords?.length } onClick={ addTopic } />
            </div>
        </Modal>
    )
}

export default AddModal
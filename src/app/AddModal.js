import React, { useState } from 'react'
import { Btn, Modal } from 'components'
import Request from 'helpers/Request'
import DropDown from 'components/DropDown'


function AddModal(props) {
    const { setModalMode, setActiveCategory, categories, fetchCategories } = props
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [title, setTitle] = useState("")
    const [keywords, setKeywords] = useState("")
    const [_category, set_Category] = useState(0)

    const closeModal = () => {
        setModalMode(null)
        setIsModalOpen(false)
    }

    const addTopic = async () => {
        try {
            setActiveCategory(null)
            const payload = {
                title: title?.trim(),
                keywords: keywords?.split(",").filter(i => i?.trim().length).map(i => i.trim()),
                category: _category
            }
            await Request("/add-topic", payload)
            setActiveCategory(_category)
            closeModal()
        } catch (err) {
            console.log(err)
        }
    }

    const addCategory = async (category) => {
        try {
            category = category.trim()
            if (categories.includes(category.toLowerCase())) return alert(`Category: "${category}" already exists!`)

            await Request("/add-category", { category })
            fetchCategories()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal handleClose={closeModal} isOpen={isModalOpen} className="bg-white rounded-md px-4 py-1">
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
                <textarea placeholder='Enter comma-separated keywords...'
                    className='border border-orange-400 rounded-md placeholder:text-zinc-400 p-2 w-[500px]'
                    rows={3} cols={50}
                    onChange={e => setKeywords(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className='flex items-center justify-between mt-5 gap-5'>
                <span className='text-zinc-500 font-semibold'>Category: </span>
                <DropDown
                    options={ categories }
                    setSelected={ set_Category }
                    addFn={ addCategory }
                    defaultValue="Select Category"
                    className="w-[500px] relative"
                />
            </div>

            <div className='text-right mt-5'>
                <Btn text="Add" disabled={!title?.length || !keywords?.length} onClick={addTopic} />
            </div>
        </Modal>
    )
}

export default AddModal
import React, { useState } from 'react'
import Btn from './Btn'
import { BsFillCaretDownFill } from 'react-icons/bs'


function DropDown(props) {
    const { options, setSelected, defaultValue, className, childClassName, addFn } = props
    const [showMenu, setShowMenu] = useState(false)
    const [displayText, setDisplayText] = useState(null)
    const [addNew, setAddNew] = useState(false)
    const [newCategory, setNewCategory] = useState("")


    return (
        <div className={className} >
            <Btn onClick={() => { setShowMenu(!showMenu); setAddNew(showMenu); }} className="font-medium bg-white py-2 text-zinc-500 w-[100%] border border-orange-500 flex items-center justify-between">
                {displayText || defaultValue}
                <BsFillCaretDownFill size={14} className="text-orange-500" />
            </Btn>
            <div className={`${showMenu ? "block absolute" : "hidden"} rounded-md bg-white py-2 border shadow w-[100%] ${childClassName}`}>
                <div onClick={() => { setShowMenu(!showMenu); setAddNew(showMenu); }}>
                    {
                        options.map(item => (
                            <div onClick={() => {
                                setDisplayText(item);
                                setSelected(item);
                            }}
                                className="text-zinc-700 mx-3 px-2 py-1 rounded-md hover:bg-orange-400 hover:text-white"
                            >{item}</div>
                        ))
                    }
                </div>
                <div className='border-t mx-3 mt-2 pt-3 py-2' >
                    {
                        addNew ? (
                            <div className='flex w-[100%]'>
                                <input className='flex-1 px-3 py-2 border rounded-l-md' placeholder='New category' onChange={e => setNewCategory(e.target.value)} />
                                <Btn className="w-[100px]" disabled={ !newCategory?.length } onClick={() => addFn(newCategory)}>Add</Btn>
                            </div>
                        ) : (
                            <button className="w-[100%] bg-white border-2 py-2 rounded-md border-orange-400 text-orange-500"  onClick={() => setAddNew(true)}>Add new category</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DropDown
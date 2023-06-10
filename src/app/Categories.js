import React, { useState } from 'react'


function CategoryItem(props) {
    const { category, isActive, onClick } = props
    const color = isActive ? "orange-600" : "zinc-800"

    return (
        <div className='w-[100px] text-center cursor-pointer' onClick={ onClick }>
            <p className={ `text-${ color }` }>{ category }</p>
            {
                isActive ? (
                    <div className={ `mt-1 border-b-[3px] border-${ color } rounded-full` }></div>
                ) : <></>
            }
        </div>
    )
}


function Categories(props) {
    const categories = ["All", "Custom", "ICP", "Mission", "Product"]
    const { activeCategory, setActiveCategory } = props

    useState(() => {
        if (!activeCategory) setActiveCategory(categories[0])
    }, [])

    return (
        <div>
            <h4 className='text-orange-600 font-semibold text-lg pb-4'>
                Categories
            </h4>
            <div className='flex gap-4'>
                {
                    categories.map((category, idx) => (
                        <CategoryItem key={ idx } category={ category } isActive={ activeCategory === category } onClick={() => setActiveCategory(category)} />
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
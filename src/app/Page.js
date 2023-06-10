import React, { useState } from 'react'
import Categories from './Categories'


function Page() {
    const [ activeCategory, setActiveCategory ] = useState(null)

    return (
        <div className='py-5 px-10'>
            <Categories activeCategory={ activeCategory } setActiveCategory={ setActiveCategory } />
        </div>
    )
}

export default Page
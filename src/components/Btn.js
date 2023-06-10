import React from 'react'


function Btn(props) {
    const { text, onClick, className } = props

    return (
        <button onClick={ onClick } className={ `text-center bg-orange-600 w-[140px] px-4 py-2 text-white rounded-md ${ className }` }>
            { text || props.children }
        </button>
    )
}

export default Btn
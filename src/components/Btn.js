import React from 'react'


function Btn(props) {
    const { text, onClick, className, disabled } = props

    return (
        <button onClick={ onClick }
            className={ `text-center ${ disabled ? "bg-zinc-300 text-zinc-400" : "bg-orange-600 text-white" } w-[140px] px-4 py-2 rounded-md ${ className }` }
            disabled={ disabled }
        >
            { text || props.children }
        </button>
    )
}

export default Btn
import React from 'react'

function Keywords(props) {
    const { keywords, onClickFn, filtered } = props
    const keywordsColors = ["fuchsia", "green", "indigo", "yellow"]


    return (
        <div className='flex gap-2'>
            {
                keywords?.map((keyword, idx) => {
                    const color = filtered ? "orange" : keywordsColors[idx % keywordsColors.length]

                    return (
                        <div onClick={() => onClickFn(keyword) }
                            className={ `cursor-pointer border-2 bg-white border-${ color }-400 text-${ color }-500 px-3 rounded-full hover:${ filtered ? "line-through" : "scale-105" }` }
                        > { keyword } </div>
                    )
                })
            }
        </div>
    )
}

export default Keywords
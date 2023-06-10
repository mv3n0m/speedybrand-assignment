import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { RxCrossCircled } from 'react-icons/rx'


function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute("id", wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
}

function Portal({ children, wrapperId = "portal-wrapper" }) {
    const [wrapperElement, setWrapperElement] = useState(null)

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId)
        let systemCreated = false

        if (!element) {
            systemCreated = true
            element = createWrapperAndAppendToBody(wrapperId)
        }
        setWrapperElement(element)

        return () => {
            if (systemCreated && element.parentNode) {
                element.parentNode.removeChild(element)
            }
        }
    }, [ wrapperId ])

    if (wrapperElement === null) return null

    return createPortal(children, wrapperElement)
}


function Modal({ children, isOpen, handleClose, className }) {
    const [ hint, setHint ] = useState(false)

    useEffect(() => {
        setHint(false)
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null
        document.body.addEventListener("keydown", closeOnEscapeKey)
        return () => {
          document.body.removeEventListener("keydown", closeOnEscapeKey)
        }
    }, [ handleClose ])


    return isOpen ? (
        <Portal wrapperId='modal-root'>
            <div className="modal">
                <div className={ `modal-content ${ className } shadow` }>
                    {
                        handleClose ? (
                            <span className='close-container'>
                                <div className={ `hint ${hint ? "block" : "hidden"}` }>Esc</div>
                                <RxCrossCircled size={ 25 } className='cursor-pointer text-orange-700 shadow bg-white rounded-full'
                                    onClick={ handleClose }  onMouseEnter={() => setHint(true)} onMouseLeave={() => setHint(false)}
                                />
                            </span>
                        ) : <></>
                    }
                    <div className='m-4'>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    ) : <></>
}

export default Modal
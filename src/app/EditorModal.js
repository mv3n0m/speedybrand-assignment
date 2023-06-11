import React, { useState } from "react"
import { Btn, Modal, LoadingGear } from "components"
import Keywords from "./Keywords"
import TextEditor from "./TextEditor"
import Request from "helpers/Request"
import { GiStabbedNote } from "react-icons/gi"
import { BsFiletypePdf } from "react-icons/bs"
import "./styles.css"


function EditorModal(props) {
    const { setModalMode, modalValues } = props
    const [ isModalOpen, setIsModalOpen ] = useState(true)
    const [ tone, setTone ] = useState(0)
    const [ loading, setLoading ] = useState(false)
    const [ content, setContent ] = useState(null)
    const { title, keywords, category } = modalValues

    const tones = [ "Informative", "Conversational", "Professional", "Persuasive", "Narrative", "Entertaining" ]

    const closeModal = () => {
        setModalMode(null)
        setIsModalOpen(false)
    }

    const generateBlog = async () => {
        setLoading(true)
        try {
            const { jsonResponse } = await Request("/generate-blog", { tone })
            setContent(jsonResponse.data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <Modal handleClose={closeModal} isOpen={isModalOpen} className="bg-white rounded-md px-4 py-1 relative min-w-[40vw]">
            <h4 className="text-orange-600 font-semibold text-lg pb-4 border-b flex justify-between items-center">
                Blog Generator
                <span className="text-zinc-600 bg-zinc-100 px-5 rounded-md">{ category }</span>
            </h4>
            <div className="my-4">
                <h6 className="text-zinc-600 font-semibold mb-2">
                    { title }
                </h6>
                <Keywords keywords={ keywords } />
            </div>
            <div className="my-10 flex gap-5">
                <select name="tone" id="tone"
                    value={ tone } onChange={e => setTone(e.target.value)}
                    className="border px-4 py-2 rounded-md text-zinc-800 bg-white"
                >
                    <option value={ 0 } disabled>Select Tone</option>
                    {
                        tones.map(tone => (
                            <option value={ tone } className="hover:bg-orange-400">{ tone }</option>
                        ))
                    }
                </select>
                <Btn className="flex items-center justify-between" onClick={ generateBlog } disabled={ !tone } >
                    <LoadingGear loading={ loading } />
                    Generate
                </Btn>
            </div>
            { content && (
                <>
                   <TextEditor content={ content } />
                   <div className="my-4 flex justify-end items-center gap-5">
                        <input placeholder="Publish API URL" className="border rounded-md px-3 py-2 w-[40vh]" disabled />
                        <Btn className="flex items-center justify-between" disabled>
                            <GiStabbedNote size={ 25 }/>
                            Publish
                        </Btn>
                        <Btn className="flex items-center justify-between" disabled>
                            <BsFiletypePdf size={ 25 }/>
                            Export
                        </Btn>
                   </div>
                </>
            )}
        </Modal>
    )
}

export default EditorModal

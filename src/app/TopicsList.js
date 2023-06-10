import React, { useEffect, useState } from 'react'
import Request from 'helpers/Request'
import TopicItem from './TopicItem'


function TopicsList(props) {
    const { activeCategory, setActiveCategory, setModalMode } = props
    const [ results, setResults ] = useState([])
    const [ topics, setTopics ] = useState(results)
    const [ filterBy, setFilterBy ] = useState([])

    const topicItemProps = { setActiveCategory, filterBy, setFilterBy, setModalMode }

    useEffect(() => {
        if (!activeCategory) return

        (async () => {
            try {
                let payload = {}
                if (activeCategory !== "All") {
                    payload = { category: activeCategory }
                }
                const { jsonResponse } = await Request("/fetch-topics", payload)
                setResults(jsonResponse.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [ activeCategory ])

    useEffect(() => {
        let _topics;
        if (filterBy?.length) {
            _topics = results.filter(({ keywords }) => keywords.some(i => filterBy.includes(i)))
        } else {
            _topics = results
        }
        setTopics(_topics)
    }, [ filterBy, results ])

    const header = {
        All: "All",
        Custom: "Your"
    }[ activeCategory ]


    return topics?.length ? (
        <div className='border rounded-md mt-10'>
            <div className='flex justify-between bg-zinc-200 font-semibold'>
                <h5 className='text-zinc-600 p-5 text-md'>
                    { header || "Recommended" } Topics
                </h5>
                {
                    filterBy?.length ? (
                        <div className='flex gap-3 items-center text-zinc-500 mx-3'>
                            Filtered by:
                            <div className='flex gap-3'>
                                {
                                    filterBy?.map(item => (
                                        <div onClick={() => setFilterBy(filterBy.filter(i => item !== i))}
                                            className='bg-white text-orange-500 rounded-full px-4 hover:scale-105 cursor-pointer border border-orange-500'
                                        >{ item }</div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : <></>
                }
            </div>
            <div className='px-5'>
                {
                    topics.map(topic => <TopicItem topic={ topic } { ...topicItemProps } />)
                }
            </div>
        </div>
    ) : <></>
}

export default TopicsList
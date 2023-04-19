import { useEffect, useState } from 'react'
import { getPostPage } from '../api/api'

const usePosts = (pageNum = 1) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getPostPage(pageNum, { signal })
            .then((data) => {
                console.log(data.nodes);
                setResults(prev => [...prev, ...data.nodes])
                setHasNextPage(Boolean(data?.nodes?.length))
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                if(signal.aborted) return
                setIsError(true)
                setError({ message: err.message })
            })

        return () => controller.abort()
    }, [pageNum])


    return { isLoading, isError, error, results, hasNextPage }
}

export default usePosts
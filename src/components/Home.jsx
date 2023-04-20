import { useCallback, useRef, useState } from "react"
import usePosts from "../hooks/usePosts"
import Post from "./Post"
import Hero from "./Hero"
import uparrow from '../assets/up-arrow.png'

const Home = () => {
    const [pageNum, setPageNum] = useState(1)
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = usePosts(pageNum)

    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
        if (isLoading) return
        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log("we are near the last post");
                setPageNum(prev => prev + 1)
            }
        })

        if (post) intObserver.current.observe(post)
    }, [isLoading, hasNextPage])

    if (isError) return <p className="flex justify-center items-center">Error: {error.message}</p>

    const content = results.map((post, i) => {
        if (results.length === i + 1) {
            return <Post ref={lastPostRef} key={post.id} post={post} />
        }
        return <Post key={post.id} post={post} />
    })

    return (
        <>
            <div className="bg-gray-100">
                <Hero />
                {content}
                {isLoading && <p className="flex justify-center items-center font-mono font-bold">Loading more posts...</p>}
                <a href="#" className="fixed bottom-4 end-3 scroll-smooth">
                    <img src={uparrow} className="w-10 h-10" />
                </a>
            </div>
        </>
    )
}

export default Home
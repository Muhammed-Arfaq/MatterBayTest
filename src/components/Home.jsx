import { useCallback, useEffect, useRef, useState } from "react"
import usePosts from "../hooks/usePosts"
import Post from "./Post"
import Hero from "./Hero"
import uparrow from '../assets/up-arrow.png'
import { BiArrowFromBottom } from 'react-icons/bi'
import { classNames } from "../hooks/classNames"

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

    //back to top

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <>
            <div className="bg-gray-100">
                <Hero />
                {content}
                {isLoading && <p className="flex justify-center items-center font-mono font-bold">Loading more posts...</p>}
                {/* <a href="#" className="fixed bottom-4 end-3 scroll-smooth">
                    <img src={uparrow} className="w-10 h-10" />
                </a> */}
                <div className="fixed bottom-2 right-2">
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className={classNames(
                            isVisible ? 'opacity-100' : 'opacity-0',
                            'bg-gradient-to-r from-violet-900 to-fuchsia-900 inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2',
                        )}
                    >
                        <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home
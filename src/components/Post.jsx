import React from 'react'

const Post = React.forwardRef(({ post }, ref) => {

    const postBody = (
        <>
            <article className="rounded-xl border-2 border-gray-100 bg-white mt-10 w-96 sm:w-11/12 ml-16 hover:shadow-2xl hover:border-purple-400">
                <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                    <a href="#" className="block shrink-0">
                        <img
                            alt="Speaker"
                            src={post?.node?.field_photo_image_section}
                            className="h-20 w-20 rounded-lg object-cover"
                        />
                    </a>

                    <div>
                        <h3 className="font-medium sm:text-lg">
                            <a href="#" className="hover:underline">
                                {post?.node?.title}
                            </a>
                        </h3>

                        <p className="line-clamp-2 text-sm text-gray-700">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
                            accusantium temporibus iure delectus ut totam natus nesciunt ex?
                            Ducimus, enim.
                        </p>

                        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                                Posted by  
                                <a href="#" className="ml-1 font-medium underline hover:text-gray-700">
                                    {post?.node?.author_name}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )

    const content = ref
        ? <article ref={ref}>{postBody}</article>
        : <article>{postBody}</article>
    
    return content
})

export default Post
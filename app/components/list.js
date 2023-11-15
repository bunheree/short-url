"use client"
import listLinks from '../../data/links.json'
import { BunCard } from './card'
import Link from 'next/link'
import { BunCopyButton } from './copyButton'

const domainName = "https://link.bunhere.com/"

export function ListLinks() {

    return (
        <>
            {listLinks.map((item, i) => (
                <div key={i} className="">
                    <BunCard>
                        <article className="relative w-full h-full p-4 md:p-8">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-xs text-zinc-100">
                                    <span>{item.created_date}</span>
                                </div>
                                <BunCopyButton linkValue={domainName + item.short_id} />
                                
                            </div>
                            <Link href={`/${item.short_id}`}>
                                <h2
                                    id="featured-post"
                                    className="mt-4 text-xl font-bold text-zinc-100 group-hover:text-white sm:text-3xl font-display"
                                >
                                    link.bunhere.com/{item.short_id}
                                </h2>
                            </Link>
                            <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                                {item.description}
                            </p>
                        </article>
                    </BunCard>
                </div>
            ))}
        </>
    )
}
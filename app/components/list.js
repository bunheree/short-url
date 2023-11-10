"use client"
import listLinks from '../../data/links.json'
import { BunCard } from './card'
import Link from 'next/link'
import { BunCopyButton } from './CopyButton'

// const domainName = process.env.DOMAIN

export function ListLinks() {
    
    return (
        <>
            {listLinks.map((item, i) => (
                <div key={i}>
                    <BunCard>
                        <div className="m-3">
                            <Link href={`/${item.short_id}`} className="cursor-pointer mr-2">
                                link.bunhere.com/{item.short_id}
                            </Link>
                            <span className="relative">
                                <BunCopyButton linkValue={`/${item.short_id}`} />
                            </span>
                            <div>
                                <p className="w-96 truncate text-xs text-blue-300">{item.origin_url}</p>
                                <p className="italic">{item.description}</p>
                            </div>
                        </div>
                    </BunCard>
                </div>
            ))}
        </>
    )
}
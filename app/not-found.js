'use client'
import { useEffect } from 'react'
import { usePathname, redirect } from 'next/navigation'
import links from '../data/links.json'

const Redirect = () => {
    const pathname = usePathname()

    useEffect(() => {
        links.forEach(item => {
            if(item.short_id == pathname.replace('/','')) {
                redirect(item.origin_url)
            }
        });
    })

    return (
        <div className="text-white">The link could not be found.</div>
    )
};

export default Redirect
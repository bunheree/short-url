'use client'
import { Copy, CheckCheck } from "lucide-react"
import { useState } from 'react'

export function BunCopyButton({ linkValue }) {
    const [copied, setCopy] = useState(false)

    const handleCopyShortUrl = (value) => {
        setCopy(true)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setCopy(false)
        }, 1000)
    }
    return (
        <>
            <button
                onClick={() => handleCopyShortUrl({linkValue})}
                className="flex items-center gap-1 text-xs text-zinc-500 cursor-pointer">
                {copied ? (
                    <CheckCheck className="w-4 h-4 text-green-400" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>
        </>
    )
}
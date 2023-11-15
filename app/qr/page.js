"use client"
import React, { useState, useEffect } from 'react'
import { BunNavigation } from "../components/nav"
import { QRCode } from 'react-qrcode-logo'

// document: https://www.npmjs.com/package/react-qrcode-logo

export default function Shorten() {
	const [originalURL, setOriginalURL] = useState('')
	const [size, setSize] = useState(200)
	const [bgColor, setBgColor] = useState('#fff')
	const [qrStyle, setQrStyle] = useState('dot')
	const [errorClass, setErrorClass] = useState(false)
	const [errorText, setErrorText] = useState('The field is required')
	const [addQR, setAddQR] = useState(false)

	const handleGenerateQR = () => {
		if (!originalURL || !isValidUrl(originalURL)) {
			if (originalURL) {
				setErrorText('Invalid URL')
			} else {
				setErrorText('The field is required')
			}
			setErrorClass(true)
			return
		} 
        setAddQR(true)
	}

	const isValidUrl = (string) => {
		try {
			new URL(string)
			return true
		} catch (err) {
			return false
		}
	}

	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<BunNavigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto overscroll-auto py-20">
				<div className="grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					<label htmlFor="price" className="block text-sm font-medium leading-6">Destination URL</label>
					<div className="relative mt-2 rounded-md shadow-sm">
						<input
							className={`block w-full rounded-md py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 border hover:border-fuchsia-500 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errorClass ? 'border border-red-400' : ''}`}
							type="text"
							placeholder="Enter your URL"
                            onChange={(e) => setOriginalURL(e.target.value)}
							onSubmit={() => handleGenerateQR}
						/>
					</div>
					{errorClass && (
						<label className="text-sm text-red-400">
							{errorText}
						</label>
					)}
					<div className="flex justify-end my-2">
						<button className="rounded-md bg-white p-2 my-2 text-gray-800 hover:text-white hover:bg-pink-300  bg-blend-darken" onClick={handleGenerateQR}>Shorten</button>
					</div>
					{addQR && (
						<QRCode 
                            value={originalURL} 
                            size={size}
                            bgColor={bgColor}
                            qrStyle={qrStyle}
                            />
					)}
				</div>
			</div>
		</div>
	)
}

"use client"
import React, { useState, useEffect } from 'react'
import { BunNavigation } from "../components/nav"
import shortid from 'shortid'
import { ListLinks } from '../components/list'
import { BunCopyButton } from '../components/CopyButton'

export default function Shorten() {
	const [originalURL, setOriginalURL] = useState('')
	const [shortenedURL, setShortenedURL] = useState('')
	const [shortened, setShortened] = useState('')
	const [errorClass, setErrorClass] = useState(false)
	const [errorText, setErrorText] = useState('The field is required')

	useEffect(() => {
		if (shortened) {
			setShortenedURL(`https://link.bunhere.com/${shortened}`)
			// Save the shorten id with origin url
			postData()
		}
	}, [shortened])

	const handleShortenURL = () => {
		if (!originalURL || !isValidUrl(originalURL)) {
			if (originalURL) {
				setErrorText('Invalid URL')
			} else {
				setErrorText('The field is required')
			}
			setErrorClass(true)
			return
		}

		setShortened(shortid.generate()) // Generate a short ID
	}

	const isValidUrl = (string) => {
		try {
			new URL(string)
			return true
		} catch (err) {
			return false
		}
	}

	const postData = async () => {
		try {
			const link = {
				origin_url: originalURL,
				short_id: originalURL,
				description: '',
				created_date: new Date()
			}

			const response = await fetch('/api/addLink', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ key: link }), // Your data to be written into the JSON file
			})

			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.error(error)
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
							value={originalURL}
							onChange={(e) => setOriginalURL(e.target.value)}
							onSubmit={handleShortenURL}
						/>
					</div>
					{errorClass && (
						<label className="text-sm text-red-400">
							{errorText}
						</label>
					)}
					<div className="flex justify-end my-2">
						<button className="rounded-md bg-white p-2 my-2 text-gray-800 hover:text-white hover:bg-pink-300  bg-blend-darken" onClick={handleShortenURL}>Shorten</button>
					</div>
					{shortenedURL && (
						<div className="flex justify-between items-center">
							<p>
								Shortened URL: <a className="text-md text-sky-500" href={shortenedURL}>{shortenedURL}</a>
							</p>
							<div className="w-fit rounded-md p-2 my-2 border hover:bg-slate-600">
								<BunCopyButton linkValue={shortenedURL} />
							</div>
						</div>
					)}

					<ListLinks />
				</div>
			</div>
		</div>
	)
}

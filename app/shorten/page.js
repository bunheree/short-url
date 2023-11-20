"use client"
import React, { useState, useEffect } from 'react'
import { BunNavigation } from '../components/nav'
import shortid from 'shortid'
import { ListLinks } from '../components/list'
import { BunCopyButton } from '../components/copyButton'
import { QRCode } from 'react-qrcode-logo'
import { QrCode, Share2, RotateCcw } from 'lucide-react'

export default function Shorten() {
	const [formData, setFormData] = useState({ origin_url: '', alias: '', description: '' })
	const [shortenedURL, setShortenedURL] = useState('')
	const [alias, setAlias] = useState('')
	const [errorClass, setErrorClass] = useState(false)
	const [errorText, setErrorText] = useState('The field is required')

	useEffect(() => {
		if (alias) {
			setShortenedURL(`https://link.bunhere.com/${alias}`)
			// Save the shorten id with origin url
			postData()
		}
	}, [alias])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(`Form submitted with data:`, formData)

		// Validate
		if (!formData.origin_url) {
			setErrorText('The field is required')
			setErrorClass(true)
		} else if (!isValidUrl(formData.origin_url)) {
			setErrorText('Invalid URL')
			setErrorClass(true)
		} else {
			if (formData.alias) {
				setAlias(formData.alias)
			} else {
				setAlias(shortid.generate())
			}
			setErrorClass(false)
		}
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

			const description = ''
			const created_date = parseCreatedDate()

			const form = {
				...formData,
				alias,
				description,
				created_date
			}
			const response = await fetch('/api/submit', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			}).then(response => {
				console.log(response.json())
			})
			const content = await response.json()
			console.log(content)
			setErrorClass(false)
		} catch (error) {
			console.error(error)
		}
	}

	const parseCreatedDate = () => {
		var nowDate = new Date();
		var date = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();
		return date
	}

	const resetForm = () => {
		setFormData({ origin_url: '', alias: '', description: '' })
		setShortenedURL('')
	}

	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<BunNavigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto overscroll-auto py-20">
				<div className="mx-auto w-2/4">

					<form className={`border border-gray-400 p-2 ${shortenedURL ? 'rounded-t-md' : 'rounded-md'}`} onSubmit={handleSubmit}>
						<div>
							<label className="block text-sm font-medium leading-6">Destination URL</label>
							<input
								className={`block w-full rounded-md py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 border hover:border-fuchsia-500 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errorClass ? 'border border-red-400' : ''}`}
								type="text"
								name="origin_url"
								placeholder="Enter your long url"
								onChange={handleChange}
								value={formData.origin_url}
								required
							/>
							{errorClass && (
								<label className="text-sm text-red-400">
									{errorText}
								</label>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium leading-6">Alias</label>
							<input
								className={`block w-full rounded-md py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 border hover:border-fuchsia-500 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errorClass ? 'border border-red-400' : ''}`}
								type="text"
								name="alias"
								placeholder="Alias"
								onChange={handleChange}
								value={formData.alias}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium leading-6">Description</label>
							<input
								className={`block w-full rounded-md py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 border hover:border-fuchsia-500 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errorClass ? 'border border-red-400' : ''}`}
								type="text"
								name="description"
								value={formData.description}
								placeholder="Description for the link detail"
								onChange={handleChange}
							/>
						</div>
						<div className="flex justify-end my-2">
							<button className="rounded-md bg-white p-2 my-2 text-gray-800 hover:text-white hover:bg-pink-300  bg-blend-darken" type="submit">Shorten</button>
						</div>
					</form>
					{shortenedURL && (
						<div className="rounded-b-md border border-gray-400 px-2">
							<p className=" py-2">
								Shortened URL: <a className="text-md text-gray-500" href={shortenedURL}>{shortenedURL}</a>
							</p>
							<div className="flex justify-between">
								<button className="w-fit rounded-md p-2 my-2 border hover:bg-slate-600" onClick={resetForm}>
									<RotateCcw className="w-4 h-4" />
								</button>
								<div className="flex items-center justify-end">
									<button className="w-fit rounded-md p-2 my-2 border hover:bg-slate-600 mx-1"><QrCode className="w-4 h-4" /></button>
									<button className="w-fit rounded-md p-2 my-2 border hover:bg-slate-600 mx-1"><Share2 className="w-4 h-4" /></button>
									<div className="w-fit rounded-md p-2 my-2 border hover:bg-slate-600 mx-1">
										<BunCopyButton linkValue={shortenedURL} />
									</div>
								</div>
							</div>
						</div>
					)}

					<ListLinks />
				</div>
			</div>
		</div>
	)
}

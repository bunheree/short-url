"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { QRCode } from 'react-qrcode-logo'
import { BunNavigation } from "../components/nav"
import { BunSingleUploadFile } from "../components/singleUpload"

// document: https://www.npmjs.com/package/react-qrcode-logo

export default function Shorten() {
	const params = useParams()
	const [formData, setFormData] = useState({ 
		url: params.url || '', 
		size: 200, 
		bgColor: '#fff', 
		qrStyle: 'dot', 
		logoImage: '',
		fgColor: '#000000',
		quietZone: '2'
	})
	const [errorClass, setErrorClass] = useState(false)
	const [errorText, setErrorText] = useState('The field is required')
	const [addQR, setAddQR] = useState(false)
	const [file, setFile] = useState('')

	useEffect(() => {
		if(file) {
			let src = URL.createObjectURL(file)
			setFormData({
				...formData,
				logoImage: src,
			})
		}
	}, [file])

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(`Form submitted with data:`, formData)

		// Validate
		if (!formData.url) {
			setErrorText('The field is required')
			setErrorClass(true)
		} else if (!isValidUrl(formData.url)) {
			setErrorText('Invalid URL')
			setErrorClass(true)
		} else {
			setErrorClass(false)
			setAddQR(true)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})

		console.log(e.target)
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
				<div className="mx-auto w-2/4">
					<form className="" onSubmit={handleSubmit}>
						<div className="py-2">
							<label className="block text-sm font-medium leading-6">URL</label>
							<input
								className={`block w-full rounded-md py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 border hover:border-fuchsia-500 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errorClass ? 'border border-red-400' : ''}`}
								type="text"
								name="url"
								placeholder="Enter your url"
								onChange={handleChange}
								value={formData.url}
								required
							/>
							{errorClass && (
								<label className="text-sm text-red-400">
									{errorText}
								</label>
							)}
						</div>
						<div className="py-2">
							<label className="block text-sm font-medium leading-6">Size</label>
							<input
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-fuchsia-500"
								type="range"
								min="200"
								max="4000"
								step="200"
								name="size"
								onChange={handleChange}
								value={formData.size}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium leading-6">Type</label>
							<select 
								name="qrStyle" 
								className="w-full rounded-md cursor-pointer dark:bg-gray-700 p-2 text-gray-900"
								onChange={handleChange}>
								<option value="squares">Squares</option>
								<option value="dots">Dots</option>
							</select>

						</div>
						<div className="py-2">
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
						<div className="py-2">
							<label className="block text-sm font-medium leading-6">Logo</label>
							<BunSingleUploadFile file={file} setFile={setFile}/>
						</div>
						<div className="flex justify-end my-2">
							<button className="neon" type="submit">Shorten</button>
						</div>
					</form>
					{addQR && (
						<QRCode
							value={formData.url}
							size={formData.size}
							bgColor={formData.bgColor}
							qrStyle={formData.qrStyle}
							logoImage={formData.logoImage}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

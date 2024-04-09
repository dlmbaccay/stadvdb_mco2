'use client'
// pages/index.js (or any other page)
import React, { useEffect, useState } from 'react'

function HomePage() {
	const [data, setData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/test')
			const newData = await res.json()
			setData(newData)
		}
		fetchData()
	}, [])

	return (
		<div>
			<h1>Database Data</h1>
			{data && (
				<ul>
					{data.map((item) => (
						<li key={item.id}>{item.name}</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default HomePage

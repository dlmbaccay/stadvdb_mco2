'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ModeToggle } from '@/components/ui/mode-toggle'
import AppointmentTable from '@/components/appointment-table'
import { CreateAppointment } from '@/components/insert-form'

export default function Home() {
	const [ loading, setLoading ] = useState(true)
	const [appointments, setAppointments] = useState([])
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		fetchData()
	}, [currentPage])

	async function fetchData() {
		setLoading(true)
		try {
			const response = await fetch(`/api/appointments?page=${currentPage}`)
			const data = await response.json()
			setAppointments(data)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching data:', error)
			setLoading(false)
		}
	}

	function incrementPage() {
		setCurrentPage(currentPage + 1)
	}

	function decrementPage() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const [column, setColumn] = useState('apptid')
    const [searchValue, setSearchValue] = useState('')

	const searchAppointment = async (event) => {
        event.preventDefault();
		setLoading(true)
        try {
            const response = await fetch(`/api/appointments?page=${currentPage}&action=search&column=${column}&searchValue=${searchValue}`)
			const data = await response.json()
			setAppointments(data)
			setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
			setLoading(false)
        }
    }

	return (
		<main className="flex flex-col bg-background w-full md:p-12 p-4">
			<div className="flex flex-col w-full h-screen items-center">
				<h1 className="text-4xl font-bold flex gap-4 mb-4 w-full items-center justify-center">
					SeriousMD Transaction Management App
					<ModeToggle />
				</h1>
				<Card className="md:w-2/3 min-w-full h-full p-6 text-black rounded-[1rem] shadow-lg gap-4 justify-between flex flex-col border border-primary">
					<div className="flex flex-row w-full h-fit p-2 gap-x-6 gap-y-2 items-center flex-wrap justify-between">
						<div className="flex flex-row h-fit p-2 gap-x-6 gap-y-2 items-center flex-wrap">
							<Button className="border border-primary hover:text-background">
								View Report
							</Button>

							<CreateAppointment />

							{/* Search Appointments */}
							<form onSubmit={(e) => {searchAppointment(e)}}>
								<select value={column} onChange={(event) => setColumn(event.target.value)} className='cursor-pointer outline-none h-10 text-sm px-2 rounded-l-lg'>
									<option value={'apptid'}>Application ID</option>
									<option value={'appt_status'}>Status</option>
									<option value={'appt_type'}>Type</option>
									<option value={'patient_gender'}>Patient Gender</option>
									<option value={'doctor_mainspecialty'}>Doctor Main Speciality</option>
									<option value={'hospital_name'}>Hospital Name</option>
									<option value={'city'}>City</option>
									<option value={'province'}>Province</option>
									<option value={'region'}>Region</option>
								</select>
								<input type="text" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className='outline-none h-10 w-80 text-sm px-4'/>
								<button type="submit" className='h-10 text-sm px-4 bg-primary text-primary-foreground rounded-r-lg font-semibold'>Search</button>
							</form>

							<Button onClick={fetchData} className="border border-primary hover:text-background">
								Reset
							</Button>
						</div>
						<div className="flex flex-row h-fit p-2 gap-x-6 gap-y-2 items-center">
							<span className="text-sm text-primary dark:text-primary-foreground">
								Showing 1-10 of 100
							</span>
							<Button
								onClick={decrementPage}
								className="border border-primary hover:text-background"
							>
								← Prev
							</Button>
							<Button
								onClick={incrementPage}
								className="border border-primary hover:text-background"
							>
								Next →
							</Button>
						</div>
					</div>

					<Card className="flex w-full h-full rounded-[1rem] border border-primary overflow-hidden">
						{ loading ? (
							<div className="flex w-full h-full items-center justify-center">
								<p>Loading appointments...</p>
							</div>
						) : (
							<AppointmentTable appointments={appointments} />
						)}
					</Card>
				</Card>
			</div>
		</main>
	)
}

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { convertMySQLDateTimeToLocalInputFormat } from '@/lib/formats'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from './ui/date-picker'

export function ViewReports() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [appointments, setAppointments] = useState([])
	const [highestHospital, setHighestHospital] = useState('')
	const [highestCount, setHighestCount] = useState(0)
	const [luzonCount, setLuzonCount] = useState(0)
	const [visayasCount, setVisayasCount] = useState(0)
	const [mindanaoCount, setMindanaoCount] = useState(0)
	const [mostCommonAgeGroup, setMostCommonAgeGroup] = useState('')
	const [mostCommonSpecialty, setMostCommonSpecialty] = useState('')

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`/api/report-data/node1`)
				const data = await response.json()
				const { count, hospital } = await getHighestAppointmentsClinic(data)
				setHighestCount(count)
				setHighestHospital(hospital)
				const { luzonCount, visayasCount, mindanaoCount } =
					await getAppointmentsForEachIslandGroup(data)
				setLuzonCount(luzonCount)
				setVisayasCount(visayasCount)
				setMindanaoCount(mindanaoCount)
				let mostCommonAgeGroup = getMostCommonAgeGroup(data)
				setMostCommonAgeGroup(mostCommonAgeGroup)
				let mostCommonSpecialty = getMostCommonSpecialty(data)
				setMostCommonSpecialty(mostCommonSpecialty)

				setAppointments(data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* Trigger Buttons */}
			<div className="flex flex-row items-center">
				<DialogTrigger asChild>
					<Button className="border border-primary hover:text-background">
						View Reports
					</Button>
				</DialogTrigger>
			</div>
			<DialogContent className="w-2/3 max-w-2/3">
				<DialogHeader>
					<DialogTitle className="text-center">Appointment Statistics</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col w-full p-8">
					<div className="mb-4">
						<Label>Total Appointments:</Label>
						<span>{appointments.length}</span>
					</div>
					<div className="mb-4">
						<Label>Consultation Appointments:</Label>
						<span>
							{
								appointments.filter(
									(appointment) => appointment.appt_type === 'Consultation',
								).length
							}
						</span>
					</div>
					<div className="mb-4">
						<Label>Inpatient Appointments:</Label>
						<span>
							{
								appointments.filter(
									(appointment) => appointment.appt_type === 'Inpatient',
								).length
							}
						</span>
					</div>
					<div className="mb-4">
						<Label>Hospital with Highest Appointments:</Label>
						<span>
							{highestCount} {highestHospital}
						</span>
					</div>
					<div className="mb-4">
						<Label>Appointments in Luzon:</Label>
						<span>{luzonCount}</span>
					</div>
					<div className="mb-4">
						<Label>Appointments in Visayas:</Label>
						<span>{visayasCount}</span>
					</div>
					<div className="mb-4">
						<Label>Appointments in Mindanao:</Label>
						<span>{mindanaoCount}</span>
					</div>
					<div className="mb-4">
						<Label>Most Common Patient Age-Group:</Label>
						<span>{mostCommonAgeGroup}</span>
					</div>
					<div className="mb-4">
						<Label>Most Common Doctor Main Specialty:</Label>
						<span>{mostCommonSpecialty}</span>
					</div>
				</div>

				<DialogFooter>
					{loading ? (
						<Button disabled>Please wait</Button>
					) : (
						<DialogClose>
							<Button className="mt-6">Close</Button>
						</DialogClose>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

async function getHighestAppointmentsClinic(appointments) {
	// Implement this function by checking the number of appointments with the same hospital name
	// Return the hospital name with the highest number of appointments
	// If there are multiple hospitals with the same highest number of appointments, return the first one

	let hospitalCounts = {}
	appointments.forEach((appointment) => {
		if (appointment.hospital_name !== 'Clinic') {
			if (hospitalCounts[appointment.hospital_name]) {
				hospitalCounts[appointment.hospital_name]++
			} else {
				hospitalCounts[appointment.hospital_name] = 1
			}
		}
	})

	let highestCount = 0
	let highestHospital = ''
	for (let hospital in hospitalCounts) {
		if (hospitalCounts[hospital] > highestCount) {
			highestCount = hospitalCounts[hospital]
			highestHospital = hospital
		}
	}

	// return count and hospital
	return { count: highestCount, hospital: highestHospital }
}

async function getMostCommonAgeGroup(appointments) {
	let ageGroups = {
		'0-10': 0,
		'11-20': 0,
		'21-30': 0,
		'31-40': 0,
		'41-50': 0,
		'51-60': 0,
		'61-70': 0,
		'71-80': 0,
		'81+': 0,
	}

	appointments.forEach((appointment) => {
		const age = appointment.patient_age
		if (age >= 0 && age <= 10) {
			ageGroups['0-10']++
		} else if (age >= 11 && age <= 20) {
			ageGroups['11-20']++
		} else if (age >= 21 && age <= 30) {
			ageGroups['21-30']++
		} else if (age >= 31 && age <= 40) {
			ageGroups['31-40']++
		} else if (age >= 41 && age <= 50) {
			ageGroups['41-50']++
		} else if (age >= 51 && age <= 60) {
			ageGroups['51-60']++
		} else if (age >= 61 && age <= 70) {
			ageGroups['61-70']++
		} else if (age >= 71 && age <= 80) {
			ageGroups['71-80']++
		} else {
			ageGroups['81+']++
		}
	})

	let mostCommonAgeGroup = ''
	let highestCount = 0
	for (let ageGroup in ageGroups) {
		if (ageGroups[ageGroup] > highestCount) {
			highestCount = ageGroups[ageGroup]
			mostCommonAgeGroup = ageGroup
		}
	}

	return mostCommonAgeGroup
}

async function getMostCommonSpecialty(appointments) {
	let specialties = {}

	appointments.forEach((appointment) => {
		const specialty = appointment.doctor_mainspecialty
		if (specialties[specialty]) {
			specialties[specialty]++
		} else {
			specialties[specialty] = 1
		}
	})

	let mostCommonSpecialty = ''
	let highestCount = 0
	for (let specialty in specialties) {
		if (specialties[specialty] > highestCount) {
			highestCount = specialties[specialty]
			mostCommonSpecialty = specialty
		}
	}

	return mostCommonSpecialty
}

async function getAppointmentsForEachIslandGroup(appointments) {
	let regions = {
		'(NCR)': 0,
		'(I)': 0,
		'(II)': 0,
		'(III)': 0,
		'(IV)': 0,
		'(V)': 0,
		'(VI)': 0,
		'(VII)': 0,
		'(VIII)': 0,
		'(IX)': 0,
		'(X)': 0,
		'(XI)': 0,
		'(XII)': 0,
		'(XIII)': 0,
		'(XIV)': 0,
		'(XV)': 0,
		'(XVI)': 0,
	}

	appointments.forEach((appointment) => {
		// if appointment.region string contains substring '(NCR)', increment regions '(NCR)'
		// if appointment.region string contains substring '(I)', increment regions '(I)'

		for (let region in regions) {
			if (appointment.region.includes(region)) {
				regions[region]++
			}
		}
	})
	console.log(regions)

	let luzonCount = 0
	let visayasCount = 0
	let mindanaoCount = 0

	for (let region in regions) {
		if (
			region.includes('(NCR)') ||
			region.includes('(I)') ||
			region.includes('(II)') ||
			region.includes('(III)') ||
			region.includes('(IV)') ||
			region.includes('(V)') ||
			region.includes('(CAR)')
		) {
			luzonCount += regions[region]
		} else if (
			region.includes('(VI)') ||
			region.includes('(VII)') ||
			region.includes('(VIII)')
		) {
			visayasCount += regions[region]
		} else if (
			region.includes('(IX)') ||
			region.includes('(X)') ||
			region.includes('(XI)') ||
			region.includes('(XII)') ||
			region.includes('(XIII)') ||
			region.includes('(ARMM)') ||
			region.includes('(BARMM)') ||
			region.includes('(XIV)') ||
			region.includes('(XV)') ||
			region.includes('(XVI)')
		) {
			mindanaoCount += regions[region]
		}
	}
	console.log(luzonCount, visayasCount, mindanaoCount)

	return { luzonCount, visayasCount, mindanaoCount }
}

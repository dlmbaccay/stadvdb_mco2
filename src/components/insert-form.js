import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from './ui/date-picker'

export function CreateAppointment() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const [appointmentStatus, setAppointmentStatus] = useState('Complete')
	const [appointmentType, setAppointmentType] = useState('Consultation')
	const [timeQueued, setTimeQueued] = useState('')
	const [queueDate, setQueueDate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [endTime, setEndTime] = useState('')
	const [virtual, setVirtual] = useState('')
	const [hospitalName, setHospitalName] = useState('')
	const [city, setCity] = useState('')
	const [province, setProvince] = useState('')
	const [region, setRegion] = useState('')
	const [doctorMainSpecialty, setDoctorMainSpecialty] = useState('')
	const [doctorAge, setDoctorAge] = useState('')
	const [patientAge, setPatientAge] = useState('')
	const [patientGender, setPatientGender] = useState('')

	const createAppointment = async (event) => {
		event.preventDefault()

		setLoading(true)
		try {
			setLoading(false)
			setOpen(false)
			router.refresh()
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* Trigger Buttons */}
			<div className="flex flex-row items-center">
				<DialogTrigger asChild>
					<Button className="border border-primary hover:text-background">Insert</Button>
				</DialogTrigger>
			</div>
			<DialogContent className="sm:max-w-[600px] lg:max-w-[720px]">
				<DialogHeader>
					<DialogTitle className="text-center">Create an Appointment</DialogTitle>
				</DialogHeader>
				<hr className="border-primary mx-4 my-2 border-b" />
				<form onSubmit={createAppointment}>
					<div className="mb-4 flex w-full flex-col">
						<div className="flex w-full flex-row gap-12 px-10">
							<div className="flex flex-col w-1/2">
								<Label>Appointment Status</Label>
								<Select
									required
									onValueChange={setAppointmentStatus}
									defaultValue={appointmentStatus}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Status">
											{appointmentStatus}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Complete">Complete</SelectItem>
										<SelectItem value="Queued">Queued</SelectItem>
										<SelectItem value="Serving">Serving</SelectItem>
										<SelectItem value="Cancel">Cancel</SelectItem>
										<SelectItem value="NoShow">No Show</SelectItem>
										<SelectItem value="Skip">Skip</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Appointment Type</Label>
								<Select>
									<SelectTrigger>
										<SelectValue>{appointmentType}</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											onClick={() => setAppointmentType('Consultation')}
										>
											Consultation
										</SelectItem>
										<SelectItem onClick={() => setAppointmentType('Inpatient')}>
											Inpatient
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Time Queued</Label>
								<DatePicker
									mode="single"
									selected={timeQueued}
									onSelect={setTimeQueued}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Queue Date</Label>
								<Input
									type="text"
									value={queueDate}
									onChange={(e) => setQueueDate(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Start Time</Label>
								<Input
									type="text"
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>End Time</Label>
								<Input
									type="text"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Virtual</Label>
								<Select>
									<SelectTrigger>
										<SelectValue>{virtual}</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem onClick={() => setVirtual('True')}>
											True
										</SelectItem>
										<SelectItem onClick={() => setVirtual('False')}>
											False
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Hospital Name</Label>
								<Input
									type="text"
									value={hospitalName}
									onChange={(e) => setHospitalName(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>City</Label>
								<Input
									type="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Province</Label>
								<Input
									type="text"
									value={province}
									onChange={(e) => setProvince(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Region</Label>
								<Input
									type="text"
									value={region}
									onChange={(e) => setRegion(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Doctor Main Specialty</Label>
								<Input
									type="text"
									value={doctorMainSpecialty}
									onChange={(e) => setDoctorMainSpecialty(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Doctor Age</Label>
								<Input
									type="text"
									value={doctorAge}
									onChange={(e) => setDoctorAge(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Patient Age</Label>
								<Input
									type="text"
									value={patientAge}
									onChange={(e) => setPatientAge(e.target.value)}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<Label>Patient Gender</Label>
								<Select>
									<SelectTrigger>
										<SelectValue>{patientGender}</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem onClick={() => setPatientGender('Male')}>
											Male
										</SelectItem>
										<SelectItem onClick={() => setPatientGender('Female')}>
											Female
										</SelectItem>
										<SelectItem onClick={() => setPatientGender('Other')}>
											Other
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>
					<DialogFooter>
						{loading ? (
							<Button disabled>Please wait</Button>
						) : (
							<Button type="submit" className="mt-6">
								Create Post
							</Button>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

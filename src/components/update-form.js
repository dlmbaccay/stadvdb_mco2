import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { convertMySQLDateTimeToLocalInputFormat } from '@/lib/formats'
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
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from './ui/date-picker'

export function UpdateAppointment({ appointment, node }) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const [appointmentId, setAppointmentId] = useState('')
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

	useEffect(() => {
		if (appointment) {
			setAppointmentId(appointment.apptid)
			setAppointmentStatus(appointment.appt_status)
			setAppointmentType(appointment.appt_type)
			setTimeQueued(convertMySQLDateTimeToLocalInputFormat(appointment.time_queued))
			setQueueDate(convertMySQLDateTimeToLocalInputFormat(appointment.queue_date))
			setStartTime(convertMySQLDateTimeToLocalInputFormat(appointment.start_time))
			setEndTime(convertMySQLDateTimeToLocalInputFormat(appointment.end_time))
			setVirtual(appointment.appt_virtual)
			setHospitalName(appointment.hospital_name)
			setCity(appointment.city)
			setProvince(appointment.province)
			setRegion(appointment.region)
			setDoctorMainSpecialty(appointment.doctor_mainspecialty)
			setDoctorAge(appointment.doctor_age)
			setPatientAge(appointment.patient_age)
			setPatientGender(appointment.patient_gender)
		}
	}, [appointment])

	const UpdateAppointment = async (event) => {
		event.preventDefault()
		console.log(appointmentId)
		setLoading(true)
		try {
			const response = await fetch('/api/appointments/' + node, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					appointmentId,
					appointmentStatus,
					appointmentType,
					timeQueued,
					queueDate,
					startTime,
					endTime,
					virtual,
					hospitalName,
					city,
					province,
					region,
					doctorMainSpecialty,
					doctorAge,
					patientAge,
					patientGender,
				}),
			})
			const data = await response.json()
			console.log(data)

			setLoading(false)
			setOpen(false)
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
					<Button className="border border-primary hover:text-background">Update</Button>
				</DialogTrigger>
			</div>
			<DialogContent className="w-5/6 max-w-5/6">
				<DialogHeader>
					<DialogTitle className="text-center">Update an Appointment</DialogTitle>
				</DialogHeader>
				<hr className="border-primary mx-4 my-2 border-b" />
				<form onSubmit={UpdateAppointment}>
					<div className="mb-4 flex w-full">
						<div className="flex w-full flex-row gap-4 px-10 flex-wrap">
							<div className="w-full flex flex-col p-8 gap-4 border border-primary rounded-lg">
								<h1 className="font-semibold">Appointment Details</h1>
								<div className="flex flex-row gap-8">
									<div className="flex flex-col w-fit">
										<Label className="py-2">Appointment Status</Label>
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
									<div className="flex flex-col w-fit">
										<Label className="py-2">Appointment Type</Label>
										<Select
											required
											onValueChange={setAppointmentType}
											defaultValue={appointmentType}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select Type">
													{appointmentType}
												</SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Consultation">
													Consultation
												</SelectItem>
												<SelectItem value="Inpatient">Inpatient</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Virtual</Label>
										<Select
											required
											onValueChange={setVirtual}
											defaultValue={virtual}
										>
											<SelectTrigger>
												<SelectValue placeholder="Is Virtual? ">
													{virtual}
												</SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="True">True</SelectItem>
												<SelectItem value="False">False</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="flex flex-row gap-8 flex-wrap">
									<div className="flex flex-col w-fit">
										<Label className="py-2">Time Queued</Label>
										<Input
											required
											type="datetime-local"
											value={timeQueued}
											onChange={(e) => setTimeQueued(e.target.value)}
										></Input>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Queue Date</Label>
										<Input
											required
											type="datetime-local"
											value={queueDate}
											onChange={(e) => setQueueDate(e.target.value)}
										></Input>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Start Time</Label>
										<Input
											required
											type="datetime-local"
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
										></Input>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">End Time</Label>
										<Input
											required
											type="datetime-local"
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
										></Input>
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col flex-wrap p-8 gap-4 border border-primary rounded-lg">
								<h1 className="font-semibold">Clinic Details</h1>
								<div className="flex flex-row gap-8 flex-wrap">
									<div className="flex flex-col w-fit">
										<Label className="py-2">Hospital Name</Label>
										<Input
											required
											type="text"
											value={hospitalName}
											onChange={(e) => setHospitalName(e.target.value)}
										/>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">City</Label>
										<Input
											required
											type="text"
											value={city}
											onChange={(e) => setCity(e.target.value)}
										/>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Province</Label>
										<Input
											required
											type="text"
											value={province}
											onChange={(e) => setProvince(e.target.value)}
										/>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Region</Label>
										<Input
											required
											type="text"
											value={region}
											onChange={(e) => setRegion(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col flex-wrap p-8 gap-4 border border-primary rounded-lg">
								<h1 className="font-semibold">Doctor and Patient Details</h1>
								<div className="flex flex-row gap-8 flex-wrap">
									<div className="flex flex-col w-fit">
										<Label className="py-2">Doctor Main Specialty</Label>
										<Input
											required
											type="text"
											value={doctorMainSpecialty}
											onChange={(e) => setDoctorMainSpecialty(e.target.value)}
										/>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Doctor Age</Label>
										<Input
											required
											type="number"
											value={doctorAge}
											onChange={(e) => setDoctorAge(e.target.value)}
										/>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Patient Age</Label>
										<Input
											required
											type="number"
											value={patientAge}
											onChange={(e) => setPatientAge(e.target.value)}
										/>
									</div>
									<div className="flex flex-col w-fit">
										<Label className="py-2">Patient Gender</Label>
										<Select
											required
											onValueChange={setPatientGender}
											defaultValue={patientGender}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select Gender ">
													{patientGender}
												</SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="MALE">Male</SelectItem>
												<SelectItem value="FEMALE">Female</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<DialogFooter>
						{loading ? (
							<Button disabled>Please wait</Button>
						) : (
							<Button type="submit" className="mt-6">
								Update Appointment
							</Button>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

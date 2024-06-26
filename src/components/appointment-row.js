import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/formats'

import AppointmentView from '@/components/appointment-view'
import { UpdateAppointment } from './update-form'

export default function AppointmentRow({ appointment, node }) {
	return (
		<TableRow className="border-collapse border-b border-slate-500">
			<TableCell>
				<AppointmentView appointment={appointment} />
			</TableCell>

			<TableCell>
				<UpdateAppointment appointment={appointment} node={node} />
			</TableCell>

			<TableCell className="font-medium overflow-hidden hover:overflow-visible min-w-fit text-left">
				{appointment.apptid}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.appt_status}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.appt_type}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.patient_age}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.patient_gender}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.doctor_mainspecialty}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.doctor_age}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{formatDate(appointment.time_queued)}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{formatDate(appointment.queue_date)}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{formatDate(appointment.start_time)}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{formatDate(appointment.end_time)}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.appt_virtual}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.hospital_name}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.city}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.province}
			</TableCell>
			<TableCell className="w-fit text-nowrap text-left capitalize">
				{appointment.region}
			</TableCell>
		</TableRow>
	)
}

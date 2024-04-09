
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export default function AppointmentRow({ appointment }) {

	return (
		<TableRow className="border-collapse border-b border-slate-500">
			<TableCell className="font-medium text-ellipsis max-w-[30px] overflow-hidden hover:overflow-visible hover:text hover:max-w-fit">
				{appointment.apptid}
			</TableCell>
			<TableCell className="text-center">{appointment.appt_status}</TableCell>
			<TableCell className="text-center">{appointment.appt_type}</TableCell>
			<TableCell className="text-center">{appointment.patient_age}</TableCell>
			<TableCell>{appointment.patient_gender}</TableCell>
			<TableCell className="text-right w-fit text-nowrap">
				{appointment.doctor_mainspecialty}
			</TableCell>
			<TableCell className="text-center">{appointment.doctor_age}</TableCell>
			<TableCell className="text-right w-fit text-nowrap">{appointment.time_queued}</TableCell>
			<TableCell className="text-right w-fit text-nowrap">{appointment.queue_date}</TableCell>
			<TableCell className="text-right w-fit text-nowrap">{appointment.start_time}</TableCell>
			<TableCell className="text-right w-fit text-nowrap">{appointment.end_time}</TableCell>
			<TableCell className="text-center">{appointment.appt_virtual}</TableCell>
			<TableCell className="text-right w-fit text-nowrap">
				{appointment.hospital_name}
			</TableCell>
			<TableCell className="text-center">{appointment.city}</TableCell>
			<TableCell className="text-center">{appointment.province}</TableCell>
			<TableCell className="text-right w-fit text-nowrap">
				{appointment.region}
			</TableCell>

			<TableCell className="items-center justify-center">
				<Button className="border border-primary hover:text-background">Update</Button>
			</TableCell>
		</TableRow>
	)
}

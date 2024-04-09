'use client'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import AppointmentRow from '@/components/appointment-row'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function AppointmentTable({appointments}) {

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Appointment ID
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Status
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Type
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Patient Age
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Patient Gender
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Doctor Main Specialty
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Doctor Age
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Time Queued
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Queue Date
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Start Time
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						End Time
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Virtual
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Hospital
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						City
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Province
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap">
						Region
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-nowrap"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{appointments && appointments.length > 0 && appointments.map((appointments) => 
					<AppointmentRow key={appointments.apptid} appointment={appointments} />)}
				{/* <AppointmentRow />
				<AppointmentRow />
				<AppointmentRow />
				<AppointmentRow />
				<AppointmentRow />
				<AppointmentRow />
				<AppointmentRow />
				<AppointmentRow />
				<AppointmentRow />
				<AppointmentRow /> */}
			</TableBody>
		</Table>
	)
}

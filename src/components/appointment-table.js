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
						Appt. ID
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500">
						Status
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500">
						Type
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Patient Age
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Patient Gender
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center text-nowrap">
						Doctor Main Specialty
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Doctor Age
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Time Queued
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Queue Date
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Start Time
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						End Time
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500">
						Virtual
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Hospital
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						City
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Province
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center">
						Region
					</TableHead>
					<TableHead className="border-collapse border-b border-slate-500 text-center"></TableHead>
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

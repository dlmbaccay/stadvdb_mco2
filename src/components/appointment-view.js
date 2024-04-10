import { formatDate } from '@/lib/formats'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

export default function AppointmentView({ appointment }) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="border border-primary hover:text-background">
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] h-fit">
                <DialogHeader>
                    <DialogTitle>View Appointment</DialogTitle>
                    <DialogClose />
                </DialogHeader>

                <div className='flex flex-col w-full min-h-full'>

                    <div>
                        <h1 className='font-bold text-xl my-2'>Appointment Details</h1>
                    </div>

                    <div className='border border-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Appointment ID</h1>
                            <p>{appointment.apptid}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Virtual</h1>
                            <p>{appointment.appt_virtual}</p>
                        </div>
                    </div>

                    <div className='border border-b-black border-l-black border-r-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Status</h1>
                            <p>{appointment.appt_status}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Type</h1>
                            <p>{appointment.appt_type}</p>
                        </div>
                    </div>

                    <div className='border border-b-black border-l-black border-r-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Time Queued</h1>
                            <p>{formatDate(appointment.time_queued)}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Queue Date</h1>
                            <p>{formatDate(appointment.queue_date)}</p>
                        </div>
                    </div>

                    <div className='border border-b-black border-l-black border-r-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Start Time</h1>
                            <p>{formatDate(appointment.start_time)}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>End Time</h1>
                            <p>{formatDate(appointment.end_time)}</p>
                        </div>
                    </div>

                    <div>
                        <h1 className='font-bold text-xl my-2'>Hospital/Clinic Details</h1>
                    </div>

                    <div className='border border-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Hospital</h1>
                            <p>{appointment.hospital_name}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>City</h1>
                            <p>{appointment.city}</p>
                        </div>
                    </div>

                    <div className='border border-b-black border-l-black border-r-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Province</h1>
                            <p>{appointment.province}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Region</h1>
                            <p>{appointment.region}</p>
                        </div>
                    </div>

                    <div>
                        <h1 className='font-bold text-xl my-2'>Doctor and Patient Details</h1>
                    </div>

                    <div className='border border-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Doctor Main Specialty</h1>
                            <p>{appointment.doctor_mainspecialty}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Doctor Age</h1>
                            <p>{appointment.doctor_age}</p>
                        </div>
                    </div>

                    <div className='border border-b-black border-l-black border-r-black flex w-full text-left p-2'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Patient Age</h1>
                            <p>{appointment.patient_age}</p>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <h1 className='font-bold'>Patient Gender</h1>
                            <p>{appointment.patient_gender}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
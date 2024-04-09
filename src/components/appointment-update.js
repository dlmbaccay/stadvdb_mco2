import { formatDate } from '@/lib/formats'

export default function AppointmentUpdate({ appointment }) {
    return (
        <div>
            <h1>Update Appointment</h1>
            <h1>Appointment ID: {appointment.apptid}</h1>
            <p>Status: {appointment.appt_status}</p>
            <p>Type: {appointment.appt_type}</p>
            <p>Patient Age: {appointment.patient_age}</p>
            <p>Patient Gender: {appointment.patient_gender}</p>
            <p>Doctor Main Specialty: {appointment.doctor_mainspecialty}</p>
            <p>Doctor Age: {appointment.doctor_age}</p>
            <p>Time Queued: {formatDate(appointment.time_queued)}</p>
            <p>Queue Date: {formatDate(appointment.queue_date)}</p>
            <p>Start Time: {formatDate(appointment.start_time)}</p>
            <p>End Time: {formatDate(appointment.end_time)}</p>
            <p>Virtual: {appointment.appt_virtual}</p>
            <p>Hospital: {appointment.hospital_name}</p>
            <p>City: {appointment.city}</p>
            <p>Province: {appointment.province}</p>
            <p>Region: {appointment.region}</p>
        </div>
    )
}
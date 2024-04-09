export function formatDate(date) {
	const formattedDate = new Date(date).toLocaleString('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})

	return formattedDate
}

// export { formatDate };

export function convertMySQLDateTimeToLocalInputFormat(mysqlDateTime) {
	// Convert MySQL datetime string to JavaScript Date object
	const mysqlDate = new Date(mysqlDateTime)

	// Get the year, month, day, hours, and minutes from the JavaScript Date object
	const year = mysqlDate.getFullYear()
	const month = String(mysqlDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
	const day = String(mysqlDate.getDate()).padStart(2, '0')
	const hours = String(mysqlDate.getHours()).padStart(2, '0')
	const minutes = String(mysqlDate.getMinutes()).padStart(2, '0')

	// Format the date and time as required for datetime-local input
	const localInputFormat = `${year}-${month}-${day}T${hours}:${minutes}`

	return localInputFormat
}

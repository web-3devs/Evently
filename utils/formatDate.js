function convertDate(timestamp) {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	]
	const dateObj = new Date(timestamp)
	const month = months[dateObj.getMonth()]
	let date = dateObj.getDate()
	let year = dateObj.getFullYear()
	let hour = dateObj.getHours()
	console.log(date, months[month])
	return `${date} ${month} ${year}`
}
export default convertDate

const getTime = (timestamp) => {
	const dateObj = new Date(timestamp)
	return `${dateObj.getHours()} ${dateObj.getMinutes()}`
}
export { getTime }

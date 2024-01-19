export const formatDate = (date: string) => {
    const newDate = new Date(date)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const newYear = newDate.getFullYear()
    const newMonth = months[newDate.getMonth()]
    const newDay = newDate.getDate()
    return newYear + " " + newMonth + " " + newDay
}
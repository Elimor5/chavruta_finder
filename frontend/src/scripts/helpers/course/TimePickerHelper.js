function setTime(selectedHour, selectedMinutes, selectedMeridian) {
    const integerHours = parseInt(selectedHour);
    let hours = integerHours === 12 ? 0 : integerHours;

    hours = selectedMeridian === "AM" ? hours : hours + 12;

    return convertToDateTime(hours, selectedMinutes);
}

function convertToDateTime(hours, mins) {
    const dateTime = new Date()
    dateTime.setHours(hours, mins)

    return dateTime
}

function setHourFromDateTime(UtcString) {
    let hour = getDateTimeFromUTC(UtcString).getHours()

    hour = hour < 12 ? hour : hour - 12

    return hour === 0 ? 12 : hour
}

function setMinutesFromDateTime(UtcString) {
    return getDateTimeFromUTC(UtcString).getMinutes()
}

function setMeridianFromDateTime(UtcString) {
    return getDateTimeFromUTC(UtcString).getHours() >= 12 ? 'PM' : 'AM'
}

function getDateTimeFromUTC(UtcString) {
    return new Date(UtcString)
}

export default {
    setTime,
    convertToDateTime,
    setHourFromDateTime,
    setMinutesFromDateTime,
    setMeridianFromDateTime
}
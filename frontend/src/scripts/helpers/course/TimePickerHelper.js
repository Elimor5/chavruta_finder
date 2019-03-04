export default {
    setTime(selectedHour, selectedMinutes, selectedMeridian) {
        const integerHours = parseInt(selectedHour);
        const integerMinutes = parseFloat(selectedMinutes);
        let hours = integerHours === 12 ? 0 : integerHours;

        hours = selectedMeridian === "AM" ? hours : hours + 12;

        return hours + integerMinutes;
    }
}
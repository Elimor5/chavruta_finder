export default {
    getDefaultTimes() {
        const defaultTimes = []

        let mins = 0;
        let hours = 0;

        while (hours < 4) {
            if (mins < 45) {
                mins += 15
            } else {
                hours++
                mins = 0
            }

            const hourLabel = hours > 1 ? 'hours' : 'hour'
            const hoursToDiplay = hours ? `${hours} ${hourLabel}` : '';
            const comma = hours && mins ? ' , ' : '';
            const minutesToDisplay = mins ? `${mins} minutes` : '';

            defaultTimes.push(`${hoursToDiplay}${comma}${minutesToDisplay}`)
        }

        return defaultTimes
    },
    convertCourseLength(lengthDigit) {
        const defaultTimes = this.getDefaultTimes()
        const defaultTimeIndex = (lengthDigit / .25) - 1

        return defaultTimes[defaultTimeIndex]
    }
}
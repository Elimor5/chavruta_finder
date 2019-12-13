import TimePickerHelper from '../../helpers/course/TimePickerHelper';


export default {
    getDefaultData() {
        return {
            Occurence: 'weekly',
            Weekdays: '1000',
            MonthDay: null,
            StartTime: TimePickerHelper.convertToDateTime(20, 0),
            Length: 1,
            Id: undefined
        }
    },
    convertFromJSON(availability) {
        const { occurrence,
            weekdays,
            length,
            monthDay,
            startTime,
            id } = availability

        return {
            Occurence: occurrence,
            Weekdays: weekdays,
            MonthDay: monthDay,
            StartTime: new Date(startTime),
            Length: parseFloat(length),
            Id: id
        }
    },
    convertFormData(courseSchedule) {
        const {
            Occurence,
            Weekdays,
            MonthDay,
            StartTime,
            Length,
            Id
        } = courseSchedule;

        return {
            occurrence: Occurence,
            weekdays: Weekdays,
            length: Length,
            month_day: MonthDay,
            start_time: StartTime,
            id: Id
        }
    },
}
import {
    required
} from 'vuelidate/lib/validators';

import TimePickerHelper from '../../helpers/course/TimePickerHelper';


export default {
    getDefaultData() {
        return {
            Occurence: 'weekly',
            Weekdays: '1000',
            MonthDay: null,
            StartTime: TimePickerHelper.convertToDateTime(20, 0),
            Length: 1
        }
    },
    convertFormData(courseSchedule) {
        const {
            Occurence,
            Weekdays,
            MonthDay,
            StartTime,
            Length
        } = courseSchedule;

        return {
            occurrence: Occurence,
            weekdays: Weekdays,
            length: Length,
            month_day: MonthDay,
            start_time: StartTime
        }
    },
}
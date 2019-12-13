import store from '../../store/store';

import CourseScheduleForm from "./CourseScheduleForm";
import CourseValidations from './CourseValidations'
import courseService from '../../services/course/courseService';

export default {
    getDefaultData() {
        const currentLevel = store.state.identity.currentUser.userIdentity.level.toString();

        return {
            StartDate: null,
            EndDate: null,
            Level: currentLevel || '3',
            InstructorId: null,
            Summary: null,
            Title: null,
            TopicId: null,
            GenderRestriction: '2',
            Location: null,
            CourseSchedules: []
        }
    },
    getDefaultCourseSchedule() {
        return CourseScheduleForm.getDefaultData()
    },
    getValidations() {
        return CourseValidations.getCourseValidations()
    },

    convertFormData(formData) {
        const {
            StartDate,
            EndDate,
            Level,
            InstructorId,
            Summary,
            Title,
            TopicId,
            GenderRestriction,
            Location,
            CourseSchedules,
        } = formData;

        return {
            course: {
                topic_id: TopicId,
                start_date: StartDate,
                end_date: EndDate,
                level: Level,
                title: Title,
                gender_restriction: GenderRestriction,
                instructor_id: InstructorId,
                summary: Summary,
                location: Location,
                availabilities_attributes: CourseSchedules.map(CourseScheduleForm.convertFormData)
            }
        }
    },
    async submit(formData) {
        return await courseService.createCourse(formData)
    }
}
import CourseScheduleForm from "./CourseScheduleForm";
import CourseValidations from './CourseValidations'
import courseService from '../../services/course/courseService';
import CreateChavrutaForm from './CreateChavrutaForm'

export default {
    populateFormFromCourse(course) {
        const { startDate, endDate, summary, title, level, topic, location, genderRestriction, instructor, id, availabilities } = course

        return {
            Id: id,
            StartDate: startDate,
            EndDate: endDate,
            Level: level,
            InstructorId: instructor.id,
            Summary: summary,
            Title: title,
            TopicId: topic.id,
            TopicName: topic.name,
            GenderRestriction: genderRestriction,
            Location: location,
            CourseSchedules: availabilities.map(availability => CourseScheduleForm.convertFromJSON(availability))
        }
    },
    getDefaultCourseSchedule() {
        return CourseScheduleForm.getDefaultData()
    },
    getValidations() {
        return CourseValidations.getCourseValidations()
    },

    convertFormData(formData) {
        return Object.assign({}, CreateChavrutaForm.convertFormData(formData), { id: formData.Id })
    },
    async submit(formData) {
        return await courseService.updateCourse(formData)
    }
}
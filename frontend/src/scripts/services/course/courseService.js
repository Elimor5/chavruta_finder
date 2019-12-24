import {
    http
} from '../../../api/http';

export default {
    async getAllCourses(params) {
        return await http({
            url: `/courses`,
            method: 'GET',
            params
        });
    },

    async getCourse(id) {
        return await http({
            url: `/courses/${id}`,
            method: 'GET'
        });
    },

    async createCourse(formData) {
        return await http({
            url: `/courses`,
            method: 'POST',
            data: formData,
        });
    },

    async updateCourse(formData) {
        return await http({
            url: `/courses/${formData.id}`,
            method: 'PUT',
            data: formData,
        });
    },

    async deleteCourse(courseId) {
        return await http({
            url: `/courses/${courseId}`,
            method: 'DELETE'
        });
    },

    async enroll(course) {
        await http({
            url: '/enrollments',
            method: 'POST',
            data: {
                enrollment: {
                    course_id: course.id
                }
            }
        })
    },

    async unenroll(enrollmentId) {
        await http({
            url: `/enrollments/${enrollmentId}`,
            method: 'DELETE',
        })
    }
}
import {
    http
} from '../../../api/http';

export default {
    async getAllCourses(searchQueryParams) {
        return await http({
            url: `/courses`,
            method: 'GET',
            params: searchQueryParams
        });
    },

    async createCourse(formData) {
        await http({
            url: `/courses`,
            method: 'POST',
            data: formData,
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
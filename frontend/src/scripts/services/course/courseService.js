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
    }
}
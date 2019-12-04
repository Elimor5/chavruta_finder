import CourseService from '../../services/course/courseService'

export default {
    strict: true,
    namespaced: true,
    state: {
        courses: [],
        limit: 20
    },
    mutations: {
        updateCourses(state, courses) {
            state.courses = courses;
        },
        clearAllCourses(state) {
            state.courses = [];
        },
        updateLimit(state, newLimit) {
            state.limit = newLimit
        }
    },
    actions: {
        async getAllCourses(context, query) {
            const courses = await CourseService.getAllCourses(query);

            context.commit('updateCourses', courses.data);
        }
    }
}
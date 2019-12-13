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
        },
        async getCourse(context, courseId) {
            const response = await CourseService.getCourse(courseId);

            const courses = context.state.courses
            const updatedCourseIndex = courses.findIndex((el) => el.id == courseId)

            const updatedCourses = [...courses.slice(0, updatedCourseIndex), response.data, ...courses.slice(updatedCourseIndex + 1)]

            context.commit('updateCourses', updatedCourses);
        },
        async removeCourse(context, courseId) {
            await CourseService.deleteCourse(courseId);

            const updatedCourses = context.state.courses.filter(course => course.id !== courseId)
            context.commit('updateCourses', updatedCourses);
        }
    }
}
import { http } from "../../../api/http";

export default {
    strict: true,
    namespaced: true,
    state: {
        currentUser: null
    },
    getters: {
        isAuthenticated: (state) => {
            return !!state.currentUser;
        }
    },
    mutations: {
        updateUser(state, userResponse) {
            const {userIdentity, coursesCreated, preferredTopics, enrolledCourses} = userResponse;
            state.currentUser = {
                userIdentity,
                coursesCreated: coursesCreated ? Object.keys(coursesCreated) : null,
                preferredTopics: preferredTopics ? Object.keys(preferredTopics) : null,
                enrolledCourses: enrolledCourses ? Object.keys(enrolledCourses) : null
            };
        }
    },
    actions: {
        async fetchIdentity(context) {
            const userResponse = await http({
                url: '/session',
                method: 'GET'
            });

            context.commit('updateUser', userResponse);
        }
    }
}
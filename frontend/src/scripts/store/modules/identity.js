import { http } from "../../../api/http";

export default {
    strict: true,
    namespaced: true,
    state: {
        currentUser: null,
        isStatusCallMade: false,
        isAuthenticated: false
    },
    mutations: {
        updateUser(state, userResponse) {
            const {userIdentity, coursesCreated, preferredTopics, enrolledCourses} = userResponse.data;
            
            state.currentUser = {
                userIdentity,
                coursesCreated: coursesCreated ? Object.keys(coursesCreated) : null,
                preferredTopics: preferredTopics ? Object.keys(preferredTopics) : null,
                enrolledCourses: enrolledCourses ? Object.keys(enrolledCourses) : null
            };

            state.isStatusCallMade = true;

            if (userIdentity) {
                state.isAuthenticated = true;
            }
        },
        resetUser(state) {
            state.currentUser = null;
            state.isAuthenticated = false;
        }
    },
    actions: {
        async fetchIdentity(context) {
            const userResponse = await http({
                url: '/session',
                method: 'GET'
            });

            context.commit('updateUser', userResponse);
        },
        async logOutUser(context, componentContext) {
            try {
                await http({
                    url: '/session',
                    method: 'DELETE'
                });
                
                componentContext.vm.$ons.notification.toast('You have successfully logged out.', { timeout: 5000, animation: 'ascend' });

                context.commit('resetUser');
            }
            catch(e) {
                vm.toastr.toast(e);
            }
        }
    }
}
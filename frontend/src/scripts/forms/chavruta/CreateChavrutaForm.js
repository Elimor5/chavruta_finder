import {
    required,
} from 'vuelidate/lib/validators';
import {
    http
} from '../../../api/http';

import store from '../../store/store';

import CourseScheduleForm from "./CourseScheduleForm";

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
            CourseSchedules: []
        }
    },
    getDefaultCourseSchedule() {
        return CourseScheduleForm.getDefaultData()
    },
    getValidations() {
        return {
            Form: {
                Title: {
                    required
                }
            }
        }
    },
    convertFormData(formData) {
        const {
            Username,
            Password,
            Name,
            Level,
            IsInstructor,
            IsMale
        } = formData;

        return {
            user: {
                username: Username,
                password: Password,
                name: Name,
                level: Level,
                is_instructor: IsInstructor,
                is_male: IsMale === '1' ? true : false
            }
        }
    },
    async submit(formData) {
        const response = await http({
            url: `/users`,
            method: 'POST',
            data: formData,
        });

        store.commit('identity/updateUser', response);
    }
}
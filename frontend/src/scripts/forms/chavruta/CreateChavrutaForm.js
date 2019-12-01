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
                },
                TopicId: {
                    required
                },
                StartDate: {
                    required
                },
                EndDate: {
                    required
                }
            }
        }
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
                availabilities_attributes: CourseSchedules.map(CourseScheduleForm.convertFormData)
            }
        }
    },
    async submit(formData) {
        await http({
            url: `/courses`,
            method: 'POST',
            data: formData,
        });
    }
}
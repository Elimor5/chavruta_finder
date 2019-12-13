import {
    required,
} from 'vuelidate/lib/validators';

export default {
    getCourseValidations() {
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
                },
                Location: {
                    required
                }
            }
        }
    }
}
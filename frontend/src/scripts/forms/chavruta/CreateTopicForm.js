import {
    required,
    maxLength
} from 'vuelidate/lib/validators';

import TopicServie from '../../services/topic/topicService'

export default {
    getDefaultData() {
        return {
            Name: null,
        }
    },
    getValidations() {
        return {
            Form: {
                Name: {
                    required,
                    maxLength: maxLength(30)
                }
            }
        }
    },
    convertFormData(formData) {
        const {
            Name,
        } = formData;

        return {
            topic: {
                name: Name,
            }
        }
    },
    async submit(formData) {
        return await TopicServie.createNewTopic(
            formData
        );
    }
}
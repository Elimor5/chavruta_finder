import {
    required,
    minLength,
    email
} from 'vuelidate/lib/validators';
import {
    http
} from '../../../api/http';
import store from '../../store/store';

export default {
    getDefaultData: () => {
        return {
            Username: null,
            Password: null,
            Name: null,
            Level: null
        }
    },
    getValidations: () => {
        return {
            Form: {
                Username: {
                    required,
                    email
                },
                Password: {
                    required,
                    minLength: minLength(6)
                },
                Name: {
                    required
                }
            }
        }
    },
    convertFormData: (formData) => {
        const {
            Username,
            Password,
            Name,
            Level
        } = formData;

        return {
            user: {
                username: Username,
                password: Password,
                name: Name,
                level: Level
            }
        }
    },
    submit: async (formData) => {
        const response = await http({
            url: `/users`,
            method: 'POST',
            params: formData,
        });

        store.commit('identity/updateUser', response);
    }
}
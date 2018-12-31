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
            Password: null
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
                }
            }
        }
    },
    convertFormData: (formData) => {
        const {
            Username,
            Password
        } = formData;

        return {
            user: {
                username: Username,
                password: Password
            }
        }
    },
    submit: async (formData) => {
        const response = await http({
            url: `/session`,
            method: 'POST',
            data: formData,
        });

        store.commit('identity/updateUser', response);
    }
}
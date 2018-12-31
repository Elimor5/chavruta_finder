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
            Level: null,
            IsMale: 1,
            IsInstructor: false
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
    submit: async (formData) => {
        const response = await http({
            url: `/users`,
            method: 'POST',
            params: formData,
        });

        store.commit('identity/updateUser', response);
    }
}
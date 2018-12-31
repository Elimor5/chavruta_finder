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
        const {
            level,
            name,
            username,
            is_instructor,
            is_male
        } = store.state.identity.currentUser.userIdentity;

        return {
            Username: username,
            Password: null,
            Name: name,
            Level: level,
            IsMale: is_male === true ? '1' : '0',
            IsInstructor: is_instructor
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
    submit: async (formData) => {
        const response = await http({
            url: `/users/${store.state.identity.currentUser.userIdentity.id}`,
            method: 'PUT',
            data: formData,
        });

        store.commit('identity/updateUser', response);
    }
}
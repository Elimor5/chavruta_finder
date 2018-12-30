import { required, minLength, email } from 'vuelidate/lib/validators';
import {http} from '../../../api/http';
import store from '../../store/store';

export default {
    getDefaultData: () => {
        const {level, name, username} = store.state.identity.currentUser.userIdentity;
        
        return {
            Username: username,
            Password: null,
            Name: name,
            Level: level
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
            params: formData,
        });
        
        store.commit('identity/updateUser', response);
    }
}
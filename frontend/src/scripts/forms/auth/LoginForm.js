import { required, minLength, email } from 'vuelidate/lib/validators';
import {http} from '../../../api/http';

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
    convertFormData(formData) {
        const {Username, Password} = formData;

        return {
            user: {
                username: Username,
                password: Password 
            }
        }
    },
    submit: async (formData) => {
        const userResponse = await http({
            url: `/session`,
            method: 'POST',
            params: formData,
        });

    }
}
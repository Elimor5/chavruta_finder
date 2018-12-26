import { required, minLength, email } from 'vuelidate/lib/validators'

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
    submit: (formData) => {
        console.log('submitted');
    }
}
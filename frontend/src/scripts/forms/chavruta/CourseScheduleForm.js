import {
    required
} from 'vuelidate/lib/validators';

import ChavrutaService from '../../../scripts/services/chavruta/chavrutaService'
import TimePickerHelper from '../../helpers/course/TimePickerHelper';


export default {
    getDefaultData() {
        return {
            Occurence: 'weekly',
            Weekdays: '1000',
            MonthDay: null,
            StartTime: TimePickerHelper.convertToDateTime(20, 0),
            Length: 1
        }
    },
    getValidations(model) {
        const validations = {
            Form: {
                Occurence: {
                    required
                },
                StartTime: {
                    required
                },
                Length: {
                    required
                }
            }
        }

        if (model.Occurence === 'monthly') {
            validations.Form.MonthDay = {
                required
            }
        } else if (model.Occurence === 'weekly') {
            validations.Form.Weekdays = {
                required
            }
        }
        return validations;
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
        return await ChavrutaService.createNewTopic(
            formData
        );
    }
}
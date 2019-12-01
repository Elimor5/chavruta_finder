<template>
    <div class="dateSelectorComponent">
        <p>Chavruta Start Date:</p>
        <DatePicker
            v-model="DateRange.StartDate"
            :popupStyle="{top: '34px'}"
            lang="en"
            :not-before="new Date()"
        ></DatePicker>
        <FormErrors :validation="validations.StartDate"></FormErrors>

        <template v-if="DateRange.StartDate">
            <p>Chavruta End Date:</p>
            <DatePicker
                v-model="DateRange.EndDate"
                :popupStyle="{top: '34px'}"
                lang="en"
                :not-before="new Date(DateRange.StartDate)"
            ></DatePicker>
            <FormErrors :validation="validations.EndDate"></FormErrors>
        </template>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import FormErrors from "../../../../../shared/forms/form-errors/FormErrors.vue";

export default {
    props: {
        validations: {
            required: true
        }
    },
    components: {
        DatePicker,
        FormErrors
    },
    data() {
        return {
            DateRange: {
                StartDate: null,
                EndDate: null
            }
        };
    },
    watch: {
        "DateRange.EndDate": {
            handler() {
                this.$emit("range-added", this.DateRange);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.dateSelectorComponent {
    padding-bottom: 30px 0;
}
</style>

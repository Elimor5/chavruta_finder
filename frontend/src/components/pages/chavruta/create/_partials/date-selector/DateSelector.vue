<template>
    <div class="dateSelectorComponent">
        <p>Chavruta Start Date:</p>
        <DatePicker
            v-model="DateRange.StartDate"
            :popupStyle="{top: '34px'}"
            lang="en"
            :not-before="new Date()"
        ></DatePicker>
        <template v-if="DateRange.StartDate">
            <p>Chavruta End Date:</p>
            <DatePicker
                v-model="DateRange.EndDate"
                :popupStyle="{top: '34px'}"
                lang="en"
                :not-before="new Date(DateRange.StartDate)"
            ></DatePicker>
        </template>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
    components: {
        DatePicker
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

<template>
    <div class="dateSelectorComponent">
        <h3>Step 2: Select a Date Range</h3>

        <p>Chavruta Start Date:</p>
        <DatePicker
            v-model="DateRange.StartDate"
            :popupStyle="{top: '34px'}"
            lang="en"
            :not-before="new Date()"
        ></DatePicker>

        <div class="endDateContainer" :class="{'active': !!DateRange.StartDate}">
            <p>Chavruta End Date:</p>
            <DatePicker
                v-model="DateRange.EndDate"
                :popupStyle="{top: '34px'}"
                lang="en"
                :not-before="new Date(DateRange.StartDate)"
            ></DatePicker>
        </div>
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
    padding: 30px 15px;

    .endDateContainer {
        opacity: 0;
        transition: opacity 0.25s ease-in;

        &.active {
            opacity: 1;
        }
    }
}
</style>

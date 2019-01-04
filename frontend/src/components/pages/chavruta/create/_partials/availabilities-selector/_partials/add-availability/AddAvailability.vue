<template>
    <div class="addAvailabilityComponent">
        <v-ons-list class="listContainer">
            <v-ons-list-header>Select occurence</v-ons-list-header>
            <v-ons-list-item tappable>
                <label class="left">
                    <v-ons-radio input-id="radio-weekly" value="weekly" v-model="Form.Occurence"></v-ons-radio>
                </label>
                <label for="radio-weekly" class="center">Weekly</label>
            </v-ons-list-item>
            <v-ons-list-item tappable>
                <label class="left">
                    <v-ons-radio input-id="radio-monthly" value="monthly" v-model="Form.Occurence"></v-ons-radio>
                </label>
                <label for="radio-monthly" class="center">Monthly</label>
            </v-ons-list-item>
        </v-ons-list>

        <template v-if="OccursWeekly">
            <WeekdayPicker v-model="Form.Weekdays"></WeekdayPicker>
        </template>
    </div>
</template>

<script>
import AddAvailabilityForm from "../../../../../../../../scripts/forms/chavruta/AddAvailabilityForm";
import WeekdayPicker from "./_partials/WeekdayPicker.vue";

export default {
    components: {
        WeekdayPicker
    },
    data() {
        return {
            Form: AddAvailabilityForm.getDefaultData()
        };
    },
    computed: {
        OccursWeekly() {
            return this.Form.Occurence === "weekly";
        }
    }
};
</script>

<style lang="scss" scoped>
.addAvailabilityComponent {
    .listContainer {
        margin: 0 -15px;
    }
}
</style>

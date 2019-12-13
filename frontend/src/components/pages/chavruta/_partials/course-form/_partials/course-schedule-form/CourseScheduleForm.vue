<template>
    <div class="courseScheduleFormComponent" v-if="Form">
        <!-- TODO: add monthly meeting functionality -->
        <!-- <v-ons-list class="listContainer">
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
        </v-ons-list>-->

        <template v-if="OccursWeekly">
            <WeekdayPicker v-model="Form.Weekdays"></WeekdayPicker>
        </template>

        <div class="timeContainer">
            <TimePicker v-model="Form.StartTime"></TimePicker>
            <TimeLengthPicker :StartTime="Form.StartTime" v-model="Form.Length"></TimeLengthPicker>
        </div>
    </div>
</template>

<script>
import WeekdayPicker from "./_partials/WeekdayPicker.vue";
import TimeLengthPicker from "./_partials/TimeLengthPicker.vue";
import TimePicker from "./_partials/TimePicker.vue";

export default {
    components: {
        WeekdayPicker,
        TimeLengthPicker,
        TimePicker
    },
    props: {
        Form: {
            type: Object,
            required: true
        }
    },
    computed: {
        OccursWeekly() {
            return this.Form.Occurence === "weekly";
        }
    }
};
</script>

<style lang="scss" scoped>
.courseScheduleFormComponent {
    .listContainer {
        margin: 0 -15px;
    }

    .timeContainer {
        display: flex;
    }
}
</style>

<template>
    <div class="timePickerComponent">
        <p>What time are you meeting?</p>
        <v-ons-list>
            <v-ons-list-item>
                <div class="center">
                    <v-ons-select class="dropdownContainer" v-model="SelectedHour">
                        <option
                            v-for="index in 12"
                            :value="index"
                            :key="index"
                        >{{ PaddedTime(index) }}</option>
                    </v-ons-select>
                </div>
            </v-ons-list-item>
            <v-ons-list-item>
                <div class="center">
                    <v-ons-select class="dropdownContainer" v-model="SelectedMinutes">
                        <option
                            v-for="(time) in [0, 15, 30, 45]"
                            :value="ParseMinutes(time)"
                            :key="time"
                        >{{ PaddedTime(time) }}</option>
                    </v-ons-select>
                </div>
            </v-ons-list-item>
            <v-ons-list-item>
                <div class="center">
                    <v-ons-select class="dropdownContainer" v-model="SelectedMeridian">
                        <option
                            v-for="(meridian) in ['AM', 'PM']"
                            :value="meridian"
                            :key="meridian"
                        >{{ meridian }}</option>
                    </v-ons-select>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </div>
</template>

<script>
import TimePickerHelper from "../../../../../../../scripts/helpers/course/TimePickerHelper";

export default {
    props: {
        value: {
            required: true
        }
    },
    data() {
        return {
            SelectedHour: null,
            SelectedMinutes: null,
            SelectedMeridian: null
        };
    },
    computed: {
        StartTime: {
            get() {
                return TimePickerHelper.setTime(
                    this.SelectedHour,
                    this.SelectedMinutes,
                    this.SelectedMeridian
                );
            }
        }
    },
    methods: {
        PaddedTime(index) {
            return ("0" + index).slice(-2);
        },
        ParseMinutes(minutes) {
            return minutes / 60;
        }
    },
    watch: {
        StartTime(newVal) {
            this.$emit("input", newVal);
        }
    }
};
</script>

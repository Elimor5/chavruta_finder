<template>
    <div class="timeLengthPickerComponent">
        <p>Class length</p>
        <v-ons-list>
            <v-ons-list-item>
                <div class="center">
                    <v-ons-select class="dropdownContainer" v-model="SelectedTimeLength">
                        <option
                            v-for="(time, index) in Times"
                            :value="CalculateTimeLength(index)"
                            :key="time"
                        >{{ time }}</option>
                    </v-ons-select>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </div>
</template>

<script>
import TimeLengthPickerHelper from "../../../../../../../scripts/helpers/course/TimeLengthPickerHelper";

export default {
    props: {
        value: {
            required: true
        }
    },
    created() {
        this.SelectedTimeLength = this.value;
    },
    data() {
        return {
            SelectedTimeLength: null,
            SelectedHour: null
        };
    },
    computed: {
        Times() {
            return TimeLengthPickerHelper.getDefaultTimes();
        }
    },
    methods: {
        CalculateTimeLength(index) {
            return (index + 1) * 0.25;
        }
    },
    watch: {
        SelectedTimeLength(newVal) {
            this.$emit("input", newVal);
        }
    }
};
</script>

<style lang="scss">
.timeLengthPickerComponent {
    margin-left: 15px;

    .list {
        display: flex;
    }
}
</style>

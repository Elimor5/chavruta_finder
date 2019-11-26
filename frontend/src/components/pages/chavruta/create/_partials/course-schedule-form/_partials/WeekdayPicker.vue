<template>
    <div class="weekdayPickerComponent">
        <p>Choose the day(s) you want to learn</p>
        <div class="weekdaysContainer">
            <template v-for="(day, $index) in Days">
                <button
                    :key="$index"
                    class="dayContainer"
                    :class="{'active': ActiveWeekdays[$index] === true}"
                    @click="ToggleActiveWeekday($index)"
                >{{day}}</button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ActiveWeekdays: {},
            WeekdaysValue: null
        };
    },
    props: {
        value: {
            type: String
        }
    },
    computed: {
        Days() {
            return ["SU", "M", "TU", "W", "TH", "F", "SA"];
        }
    },
    created() {
        const intValue = parseInt(this.value);

        if (intValue) {
            this.ToggleWeekdaysFromValue(this.value);
        }
    },
    methods: {
        ToggleActiveWeekday(index) {
            const activeDaysClone = Object.assign({}, this.ActiveWeekdays);

            if (activeDaysClone[index]) {
                activeDaysClone[index] = !activeDaysClone[index];
            } else {
                activeDaysClone[index] = true;
            }

            this.ActiveWeekdays = activeDaysClone;
        },
        ToggleWeekdaysFromValue(value) {
            for (let i = 0; i < value.length; i++) {
                if (parseInt(value[i])) {
                    this.ToggleActiveWeekday(value.length - 1 - i);
                }
            }
        }
    },
    watch: {
        ActiveWeekdays: {
            deep: true,
            handler(newVal) {
                let total = 0;
                const indeces = Object.keys(newVal);

                indeces.forEach(index => {
                    if (newVal[index]) {
                        total += 10 ** index;
                    }
                });

                this.$emit("input", total.toString());
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.weekdayPickerComponent {
    margin: 30px 0;

    .weekdaysContainer {
        display: flex;
        justify-content: space-between;

        .dayContainer {
            display: flex;
            align-items: center;
            justify-content: center;

            height: 40px;
            width: 40px;

            font-size: 17px;
            border: none;

            background-color: white;
            transition: background-color 0.25s ease;
            transition: color 0.25s ease;

            border-radius: 50%;
            outline: none;

            &.active {
                background-color: $colorPrimary;
                color: white;
            }
        }
    }
}
</style>

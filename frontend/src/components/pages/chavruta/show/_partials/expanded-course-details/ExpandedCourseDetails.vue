<template>
    <div class="expandedCourseDetailsComponent" v-if="Course">
        <h5>Meeting times:</h5>

        <div v-for="(availability, index) in Course.availabilities" :key="index">
            <p>{{ShowAvailabiity(availability)}} for {{ShowLength(availability)}}</p>
        </div>

        <h5>Level:</h5>
        <p>{{DifficultyLevel}}</p>

        <h5>Course Start Date:</h5>
        <p>{{StartDate}}</p>

        <h5>Course End Date:</h5>
        <p>{{EndDate}}</p>

        <h5>Created By:</h5>
        <p>{{Course.author.name}}</p>

        <template v-if="Course.summary">
            <h5>Summary:</h5>
            <p>{{Course.summary}}</p>
        </template>

        <template v-if="Course.instructor.id">
            <h5>Instructor:</h5>
            <p>{{Course.instructor.name}}</p>
        </template>

        <template v-if="Course.enrolledUsers && Course.enrolledUsers.length">
            <h5>Enrolled Users:</h5>
            <ul class="namesList">
                <li class="namesListItem" v-for="username in Course.enrolledUsers" :key="username">
                    <UserAvatar :Name="username" :Color="GetRandomColor()" size="30"></UserAvatar>
                    {{username}}
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import { parseWeekdays } from "../../../../../../scripts/helpers/course/WeekdayPickerHelper";
import TimePickerHelper from "../../../../../../scripts/helpers/course/TimePickerHelper";
import { formatDate } from "../../../../../../scripts/helpers/course/DateHelper";
import TimeLengthPickerHelper from "../../../../../../scripts/helpers/course/TimeLengthPickerHelper";
import RandomColorGenerator from "../../../../../../scripts/helpers/course/RandomColorGenerator";

import UserAvatar from "../../../../../shared/user-avatar/UserAvatar.vue";

export default {
    components: {
        UserAvatar
    },
    props: {
        Course: {
            required: true
        }
    },
    computed: {
        DifficultyLevel() {
            const difficultyMap = {
                0: "Beginner",
                1: "Intermediate",
                2: "Advanced",
                2: "Any"
            };

            return difficultyMap[this.Course.level];
        },
        StartDate() {
            return formatDate(new Date(this.Course.startDate));
        },
        EndDate() {
            return formatDate(new Date(this.Course.endDate));
        }
    },
    methods: {
        ShowAvailabiity(availability) {
            const weekdays = parseWeekdays(availability.weekdays);
            const hour = TimePickerHelper.setHourFromDateTime(
                availability.startTime
            );
            const minute = `${TimePickerHelper.setMinutesFromDateTime(
                availability.startTime
            )}0`.slice(0, 2);
            const meridian = TimePickerHelper.setMeridianFromDateTime(
                availability.startTime
            );

            return `${weekdays} at ${hour}:${minute} ${meridian}`;
        },
        ShowLength(availability) {
            return TimeLengthPickerHelper.convertCourseLength(
                availability.length
            );
        },
        GetRandomColor() {
            return RandomColorGenerator.GetRandomColor();
        }
    }
};
</script>

<style lang="scss" scoped>
.expandedCourseDetailsComponent {
    margin-top: 25px;

    h5 {
        font-weight: bold;
        font-size: 16px;
    }

    .namesList {
        list-style: none;

        &Item {
            padding-bottom: 10px;
            display: flex;
            align-items: center;

            .userAvatarComponent {
                margin-right: 10px;
            }
        }
    }
}
</style>

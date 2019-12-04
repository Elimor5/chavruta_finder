<template>
    <div class="courseCardComponent">
        <v-ons-card :key="course.id">
            <p class="title">{{ course.title }}</p>
            <p class="topic">{{course.topic}}</p>

            <p class="location">at {{ course.location }}</p>

            <div class="buttons">
                <MDbutton inverted="true">Enroll</MDbutton>
            </div>
        </v-ons-card>
    </div>
</template>

<script>
import { parseWeekdays } from "../../../scripts/helpers/course/WeekdayPickerHelper";
import MDbutton from "../../shared/buttons/md-button/MDButton.vue";

export default {
    components: {
        MDbutton
    },
    props: {
        course: {
            required: true
        }
    }
};
</script>

<style lang="scss">
.courseCardComponent {
    width: 100%;

    p {
        margin: 5px 0;
    }

    .card {
        padding: 15px;
        margin: 15px;
    }

    .title {
        font-weight: bold;
        font-size: 20px;
    }

    .topic {
        color: gray;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
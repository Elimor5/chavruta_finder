<template>
    <div class="courseCardComponent">
        <v-ons-card :key="Course.id">
            <p class="title">{{ Course.title }}</p>
            <p class="topic">{{Course.topic}}</p>

            <p class="location">at {{ Course.location }}</p>

            <template v-if="IsLoggedIn">
                <div class="buttons">
                    <template v-if="EnrollmentId">
                        <MDbutton
                            class="unenrollButton"
                            inverted="true"
                            @click="UnenrollFromCourse"
                        >Leave Course</MDbutton>
                    </template>
                    <template v-else>
                        <MDbutton inverted="true" @click="EnrollInCourse">Enroll</MDbutton>
                    </template>
                </div>
            </template>
        </v-ons-card>
    </div>
</template>

<script>
import { parseWeekdays } from "../../../scripts/helpers/course/WeekdayPickerHelper";
import MDbutton from "../../shared/buttons/md-button/MDButton.vue";
import courseService from "../../../scripts/services/course/courseService";

export default {
    components: {
        MDbutton
    },
    props: {
        Course: {
            required: true
        }
    },
    computed: {
        EnrollmentId() {
            const enrollments = this.$store.state.identity.currentUser
                .enrollments;

            return enrollments && enrollments[this.Course.id];
        },
        IsLoggedIn() {
            return this.$store.state.identity.isAuthenticated;
        }
    },
    methods: {
        async EnrollInCourse() {
            try {
                await courseService.enroll(this.Course);
                // identity call returns all enrollments
                await this.$store.dispatch("identity/fetchIdentity");
            } catch (e) {
                this.$toastr.toast(e);
            }
        },
        async UnenrollFromCourse() {
            try {
                await courseService.unenroll(this.EnrollmentId);
                await this.$store.dispatch("identity/fetchIdentity");
            } catch (e) {
                this.$toastr.toast(e);
            }
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

        .unenrollButton {
            button {
                color: red;
            }
        }
    }
}
</style>
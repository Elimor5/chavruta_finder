<template>
    <div class="courseCardComponent" v-if="Course">
        <v-ons-card :key="Course.id">
            <p class="title">{{ Course.title }}</p>
            <p class="topic">{{Course.topic.name}}</p>

            <p class="location">at {{ Course.location }}</p>

            <slot></slot>

            <h5 class="expirationWarning" v-if="IsCourseExpired">This course has ended.</h5>

            <template v-if="IsLoggedIn  && !IsCourseExpired">
                <div class="buttons">
                    <template v-if="IsAuthorCurrentUser">
                        <template v-if="ShowAdminButtons">
                            <MDbutton
                                class="warningButton"
                                Inverted="true"
                                IsNested="true"
                                @click="ToggleDialog"
                            >Delete</MDbutton>
                            <MDbutton
                                class="editButton"
                                Inverted="true"
                                IsNested="true"
                                @click="EditCourse"
                            >Edit</MDbutton>
                        </template>
                    </template>
                    <template v-if="EnrollmentId">
                        <MDbutton
                            IsNested="true"
                            class="warningButton"
                            Inverted="true"
                            @click="UnenrollFromCourse"
                        >Leave</MDbutton>
                    </template>
                    <template v-else>
                        <MDbutton Inverted="true" IsNested="true" @click="EnrollInCourse">Enroll</MDbutton>
                    </template>
                </div>
            </template>
        </v-ons-card>
        <v-ons-dialog class="courseCardDialog" cancelable :visible.sync="IsDialogVisible">
            <p class="dialog-text">Delete Chavruta?</p>
            <div class="buttonsContainer">
                <MDbutton class="editButton" Inverted="true" @click="ToggleDialog">Cancel</MDbutton>
                <MDbutton class="warningButton" Inverted="true" @click="DeleteCourse">Delete</MDbutton>
            </div>
        </v-ons-dialog>
    </div>
</template>

<script>
import { parseWeekdays } from "../../../scripts/helpers/course/WeekdayPickerHelper";
import MDbutton from "../../shared/buttons/md-button/MDButton.vue";
import courseService from "../../../scripts/services/course/courseService";
import CourseDetailsHelper from "../../../scripts/helpers/course/CourseDetailsHelper";

export default {
    components: {
        MDbutton
    },
    data() {
        return {
            IsDialogVisible: false,
            IsLoaded: false
        };
    },
    props: {
        Course: {
            required: true
        },
        ShowAdminButtons: {
            default: false
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
        },
        IsCourseExpired() {
            return CourseDetailsHelper.isExpired(this.Course);
        },
        IsAuthorCurrentUser() {
            if (!this.IsLoggedIn) return false;

            const currentUserId = this.$store.state.identity.currentUser
                .userIdentity.id;

            return currentUserId === this.Course.author.id;
        }
    },
    methods: {
        async EnrollInCourse() {
            try {
                await courseService.enroll(this.Course);
                // identity call returns all enrollments
                await this.$store.dispatch("identity/fetchIdentity");
                await this.$store.dispatch("course/getCourse", this.Course.id);
            } catch (e) {
                this.$toastr.toast(e);
            }
        },
        async UnenrollFromCourse() {
            try {
                await courseService.unenroll(this.EnrollmentId);
                await this.$store.dispatch("identity/fetchIdentity");
                await this.$store.dispatch("course/getCourse", this.Course.id);
            } catch (e) {
                this.$toastr.toast(e);
            }
        },
        EditCourse() {
            if (!this.IsLoggedIn) return false;

            const courseId = this.Course.id;

            this.$router.push(`/chavruta/edit/${courseId}`);
        },
        ToggleDialog() {
            this.IsDialogVisible = !this.IsDialogVisible;
        },
        async DeleteCourse() {
            this.$loader.show();

            try {
                await this.$store.dispatch(
                    "course/removeCourse",
                    this.Course.id
                );

                this.$ons.notification.toast(
                    "Course has been successfully deleted.",
                    { timeout: 5000, animation: "ascend" }
                );

                this.$router.push("/");
            } catch (e) {
                this.$toastr.toast(e);
            }

            this.$loader.hide();
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
        padding-bottom: 3px;
        color: gray;
    }

    .expirationWarning {
        color: red;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;

        button {
            padding-left: 20px;
            padding-right: 20px;
        }

        .warningButton {
            button {
                color: red;
            }
        }
        .editButton {
            button {
                color: #228b22;
            }
        }
    }
}

.courseCardDialog {
    .dialog-text {
        text-align: center;
        font-weight: bold;
        padding-bottom: 3px;
    }
    .buttonsContainer {
        display: flex;
        justify-content: space-around;

        button {
            padding-left: 30px;
            padding-right: 30px;
        }
    }
}
</style>
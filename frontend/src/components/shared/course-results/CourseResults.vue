<template>
    <div class="courseResultsComponent">
        <template v-if="Courses">
            <v-ons-list>
                <router-link
                    v-for="(course, index) in Courses"
                    :key="index"
                    :to="CourseShowPagePath(course)"
                    :event="!IsExpired(course) ? 'click' : ''"
                >
                    <CourseCard :Course="course"></CourseCard>
                </router-link>
            </v-ons-list>
        </template>
        <template v-else>
            <v-ons-card>
                <h4>There are no courses to show.</h4>
            </v-ons-card>
        </template>
    </div>
</template>   

<script>
import CourseCard from "../course-card/CourseCard.vue";
import CourseDetailsHelper from "../../../scripts/helpers/course/CourseDetailsHelper";

export default {
    components: {
        CourseCard
    },
    computed: {
        Courses() {
            return this.$store.state.course.courses;
        }
    },
    methods: {
        CourseShowPagePath(course) {
            return `/chavruta/${course.id}`;
        },
        IsExpired(course) {
            return CourseDetailsHelper.isExpired(course);
        }
    }
};
</script>

<style lang="scss">
.courseResultsComponent {
    .list {
        background: $backgroundColor;
        margin: 0;
        box-shadow: none;
    }
}
</style>
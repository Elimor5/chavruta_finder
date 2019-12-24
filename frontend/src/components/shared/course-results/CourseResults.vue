<template>
    <div class="courseResultsComponent">
        <template v-if="Courses">
            <v-ons-list>
                <router-link
                    v-for="(course, index) in Courses"
                    :key="index"
                    :to="CourseShowPagePath(course)"
                >
                    <CourseCard :Course="course"></CourseCard>
                </router-link>
            </v-ons-list>
        </template>
    </div>
</template>   

<script>
import CourseCard from "../course-card/CourseCard.vue";

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
        }
    }
};
</script>
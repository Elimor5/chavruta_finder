<template>
    <div class="findChavrutaComponent">
        <v-ons-page :infinite-scroll="loadMore">
            <CourseSearch ref="CourseSearch"></CourseSearch>

            <template v-if="Courses">
                <v-ons-list>
                    <CourseCard v-for="course in Courses" :key="course.id" :course="course"></CourseCard>
                </v-ons-list>
            </template>

            <!-- <template v-for="item in list"></template> -->
        </v-ons-page>
    </div>
</template>

<script>
import Vue from "vue";
import CourseSearch from "../find/_partials/CourseSearch.vue";
import CourseCard from "../../../shared/course-card/CourseCard.vue";

export default {
    components: {
        CourseSearch,
        CourseCard
    },
    computed: {
        Courses() {
            return this.$store.state.course.courses;
        },
        Limit: {
            get() {
                return this.$store.state.course.limit;
            },
            set(newLimit) {
                this.$store.commit("course/updateLimit", newLimit);
            }
        }
    },
    methods: {
        async loadMore(done) {
            this.Limit += 10;

            await this.$refs.CourseSearch.DebouncedTopicsCall();

            done();
        }
    }
};
</script>

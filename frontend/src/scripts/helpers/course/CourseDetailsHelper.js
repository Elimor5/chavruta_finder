export default {
    isExpired(course) {
        const courseEndDate = new Date(course.endDate);
        const today = new Date();

        return courseEndDate < today;

    }
}
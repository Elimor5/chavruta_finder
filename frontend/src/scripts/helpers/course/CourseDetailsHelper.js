export default {
    isExpired(course) {
        // adjust for timezone correction
        const courseEndDate = new Date(course.endDate + 'T05:00:00.000Z');
        const today = new Date();

        return courseEndDate < today;

    }
}
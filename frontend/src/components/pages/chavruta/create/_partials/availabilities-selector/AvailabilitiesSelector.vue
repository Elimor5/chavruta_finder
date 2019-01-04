<template>
    <div class="availabilitiesSelectorComponent">
        <AddAvailability></AddAvailability>
    </div>
</template>

<script>
import AddAvailability from "./_partials/add-availability/AddAvailability.vue";

export default {
    components: {
        AddAvailability
    },
    props: {
        Availabilities: {}
    }
};
</script>

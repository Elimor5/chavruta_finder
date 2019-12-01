<template>
    <div class="formErrorsComponent">
        <div class="focusNavbarOffset inputError"></div>

        <template v-if="ErrorMessage">
            <p class="error">{{ErrorMessage}}</p>
        </template>
    </div>
</template>

<script>
export default {
    props: ["validation"],
    computed: {
        ErrorMessage() {
            const { validation } = this;
            const errors = [];

            if (!validation || !validation.$error) return null;

            if (validation.hasOwnProperty("required") && !validation.required) {
                errors.push("this field is required");
            } else if (
                validation.hasOwnProperty("email") &&
                !validation.email
            ) {
                errors.push("please enter a valid email address");
            } else if (
                validation.hasOwnProperty("minLength") &&
                !validation.minLength
            ) {
                errors.push(
                    `minimum length must be at least ${validation.$params.minLength.min} characters`
                );
            } else if (
                validation.hasOwnProperty("maxLength") &&
                !validation.maxLength
            ) {
                errors.push(
                    `max length must be at least ${validation.$params.maxLength.max} characters`
                );
            }

            return errors[0];
        }
    }
};
</script>

<style lang="scss">
.formErrorsComponent {
    .focusNavbarOffset {
        position: absolute;
        top: -100px;
        visibility: hidden;
    }

    margin: 0 0 3px 0;
    font-size: 12px;
    color: red;
}
</style>
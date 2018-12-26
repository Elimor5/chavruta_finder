<template>
    <div class="formGroupComponent">
        <v-ons-list-item modifier="nodivider">
            <div class="left">
                <slot name="icon"></slot>
            </div>
            <label class="center">
                <slot name="input"></slot>
            </label>
        </v-ons-list-item>
        <template v-for="(errorMessage, idx) in ErrorMessages">
            <p class="error" :key="idx">
                {{errorMessage}}
            </p>
        </template>
    </div>
</template>

<script>
export default {
    props: ["validation"],
    computed: {
        ErrorMessages() {
            const { validation } = this;
            const errors = [];

            if (!validation.$error) return errors;

            if (validation.hasOwnProperty("required") && !validation.required) {
                errors.push("this field is required");
            } 
            else if (validation.hasOwnProperty("email") && !validation.email) {
                errors.push("please enter a valid email address");
            }

            return errors;
        }
    }
};
</script>

<style lang="scss">
.formGroupComponent {
    padding-top: 15px;

    .inputField {
        width: 100%;
        padding-right: 20px;
    }
}
</style>

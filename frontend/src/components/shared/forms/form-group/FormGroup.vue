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
    </div>
</template>

<script>
export default {
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

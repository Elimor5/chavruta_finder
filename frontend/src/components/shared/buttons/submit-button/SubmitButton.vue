<template>
    <button class="submitButtonComponent" @click="HandleClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    methods: {
        HandleClick() {
            this.$emit('click');
        }
    }
}
</script>

<style lang="scss">
    .submitButtonComponent {
        margin-top: 15px;
        width: 90%;
        height: 35px;
        background: $colorPrimary;
        color: white;
        font-size: 17px;
        font-weight: bold;
        border-radius: 5%;
    }
</style>


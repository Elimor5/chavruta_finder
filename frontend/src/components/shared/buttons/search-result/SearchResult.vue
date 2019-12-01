<template>
    <button type="button" class="searchResultComponent" @click="HandleClick">
        <span class="textContainer">
            <slot name="title"></slot>
        </span>
    </button>
</template>

<script>
export default {
    methods: {
        HandleClick() {
            this.$emit("click");
        }
    }
};
</script>


<style lang="scss" scoped>
.searchResultComponent {
    background-color: white;
    text-align: left;
    border: none;

    padding: 15px;
    font-size: 14px;
    width: 100%;

    &:hover,
    &:focus {
        background-color: $colorPrimary;
        color: white;
        outline: none;
    }

    .textContainer {
        pointer-events: none;
    }
}
</style>


<template>
    <button class="searchResultComponent" @click="HandleClick">
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
    border-bottom: solid 1px gray;
    text-align: left;

    padding: 15px;
    font-size: 14px;
    width: 100%;

    transition: background-color 0.5s ease;
    transition: color 0.5s ease;

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


<template>
    <button class="sideNavItemComponent" @click="HandleClick">
        <slot name="icon"></slot>
        <div class="contentContainer">
            <slot name="content"></slot>
        </div>
    </button>
</template>

<script>
export default {
    methods: {
        HandleClick() {
            return this.$emit("click");
        }
    }
};
</script>

<style lang="scss" scoped>
.sideNavItemComponent {
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: #0076ff;

    text-align: left;

    display: flex;
    align-items: center;

    &:focus {
        border: 1px dotted gray;
    }
    

    .contentContainer { 
        padding: 0 7.5px;
    }
}
</style>


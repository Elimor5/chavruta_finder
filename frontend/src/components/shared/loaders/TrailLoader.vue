<template>
    <div class="trailLoaderComponent">
        <v-ons-progress-circular class="trailLoader" indeterminate="true"></v-ons-progress-circular>
    </div>
</template>

<style lang="scss">
.trailLoaderComponent {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    .trailLoader {
        height: 60px;
        width: 60px;
        opacity: 1;
        z-index: 1;

        .progress-circular--material__primary {
            stroke: $colorPrimary;
        }
    }
}
</style>


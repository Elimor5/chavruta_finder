<template>
    <div class="toastrComponent">
        <div class="toastrContainer">
            <div class="iconContainer">
                <v-ons-icon icon="fa-warning" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="messageContainer">
                <span>{{message}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        message() {
            return;
        }
    }
}
</script>

<style lang="scss" scoped>
.toastrComponent {
    position: absolute;
    top: 0px;
    z-index: 1;

    height: 57px;
    width: 100%;
    background-color: red;
    color: white;
    font-size: 18px;

    border-radius: 3px;

    transition: top 0.5s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .toastrContainer {
        display: flex;
        align-items: center;

        .iconContainer {
            margin: 0 15px;
        }

        .messageContainer {
            flex-grow: 1;
        }
    }
}
</style>


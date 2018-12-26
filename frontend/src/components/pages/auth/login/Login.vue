<template>
    <div class="authLoginComponent">
        <div class="iconContainer">
            <v-ons-icon icon="md-account-box" class="list-item__icon"></v-ons-icon>
        </div>

        <v-ons-list class="formInputContainer">
            <v-ons-list-item modifier="nodivider">
                <div class="left">
                    <v-ons-icon icon="fa-user" class="list-item__icon"></v-ons-icon>
                </div>
                <label class="center">
                    <v-ons-input class="inputField" float="true" placeholder="Username" v-model="name"></v-ons-input>
                </label>
            </v-ons-list-item>
            <v-ons-list-item modifier="nodivider">
                <div class="left">
                    <v-ons-icon icon="fa-key" class="list-item__icon"></v-ons-icon>
                </div>
                <label class="center">
                    <v-ons-input class="inputField" float="true" placeholder="Password" type="password" v-model="name"></v-ons-input>
                </label>
            </v-ons-list-item>
        </v-ons-list>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.iconContainer {
    text-align: center;
    margin: 40px 0;
    color: gray;

    .list-item__icon {
        font-size: 100px;
    }
}

.formInputContainer {
    padding-top: 15px;
    padding-bottom: 15px;

    .inputField {
        width: 100%;
        padding-right: 20px;
    }
}
</style>

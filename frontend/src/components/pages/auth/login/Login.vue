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
                    <v-ons-input
                        class="inputField"
                        float="true"
                        placeholder="Username"
                        v-model="Form.Username"
                    ></v-ons-input>
                </label>
            </v-ons-list-item>
            <template v-if="$v.Form.Username.$error">
                <p>this field is required</p>
            </template>
            <v-ons-list-item modifier="nodivider">
                <div class="left">
                    <v-ons-icon icon="fa-key" class="list-item__icon"></v-ons-icon>
                </div>
                <label class="center">
                    <v-ons-input
                        class="inputField"
                        float="true"
                        placeholder="Password"
                        type="password"
                        v-model="Form.Password"
                    ></v-ons-input>
                </label>
            </v-ons-list-item>

            <v-ons-button
                type="submit"
                modifier="large"
                class="authSubmitButton"
                @click="SubmitForm"
            >Log in</v-ons-button>
        </v-ons-list>

        <pre>{{Form}}</pre>
        <pre>{{$v}}</pre>
    </div>
</template>

<script>
import LoginForm from "../../../../scripts/forms/auth/LoginForm.js";

export default {
    data() {
        return {
            Form: LoginForm.getDefaultData()
        };
    },
    validations: LoginForm.getValidations(),
    methods: {
        SubmitForm() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            LoginForm.submit(this.Form);
        }
    }
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
    padding-bottom: 20px;
    text-align: center;

    .inputField {
        width: 100%;
        padding-right: 20px;
    }

    .authSubmitButton {
        margin-top: 15px;
        width: 90%;
    }
}
</style>

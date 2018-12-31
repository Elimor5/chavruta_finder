<template>
    <div class="authLoginComponent">
        <div class="iconContainer">
            <v-ons-icon icon="md-account-box" class="list-item__icon"></v-ons-icon>
        </div>

        <form @submit.prevent="SubmitForm" novalidate>
            <v-ons-list class="formInputContainer">
                <cf-formgroup :validation="$v.Form.Username">
                    <template slot="icon">
                        <v-ons-icon icon="fa-user" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="input">
                        <v-ons-input
                            class="inputField"
                            float="true"
                            placeholder="Username"
                            type="email"
                            v-model.trim="Form.Username"
                        ></v-ons-input>
                    </template>
                </cf-formgroup>
                <cf-formgroup :validation="$v.Form.Password">
                    <template slot="icon">
                        <v-ons-icon icon="fa-key" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="input">
                        <v-ons-input
                            class="inputField"
                            float="true"
                            placeholder="Password"
                            type="password"
                            v-model="Form.Password"
                        ></v-ons-input>
                    </template>
                </cf-formgroup>

                <SubmitButton>Log In</SubmitButton>
            </v-ons-list>
        </form>
    </div>
</template>

<script>
import LoginForm from "../../../../scripts/forms/auth/LoginForm.js";
import SubmitButton from "../../../shared/buttons/submit-button/SubmitButton.vue";

export default {
    components: {
        SubmitButton
    },
    data() {
        return {
            Form: LoginForm.getDefaultData()
        };
    },
    validations: LoginForm.getValidations(),
    methods: {
        async SubmitForm() {
            if (!this.$validate(this.$v)) return;

            this.$loader.show();

            try {
                const convertedFormData = LoginForm.convertFormData(this.Form);

                const response = await LoginForm.submit(convertedFormData);
                this.$router.push(this.$route.query.returnUrl || "/");
            } catch (e) {
                this.$toastr.toast(e);
            }

            this.$loader.hide();
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
    padding-bottom: 20px;

    text-align: center;
}
</style>

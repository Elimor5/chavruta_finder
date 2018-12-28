<template>
    <div class="authLoginComponent">
        <div class="iconContainer">
            <v-ons-icon icon="md-account-box" class="list-item__icon"></v-ons-icon>
        </div>
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
                        v-model="Form.Username"
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
        
            <v-ons-button
                type="submit"
                modifier="large"
                class="authSubmitButton"
                @click="SubmitForm"
            >Log in</v-ons-button>
        </v-ons-list>
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
    computed: {
        ReturnUrl() {
            const fullPath = this.$route.query.returnUrl;
            const baseUrl = window.location.origin;

            return fullPath.split(baseUrl)[1];
        }
    },
    validations: LoginForm.getValidations(),
    methods: {
        async SubmitForm() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            this.$loader.show();

            try {
                const convertedFormData = LoginForm.convertFormData(this.Form)
                
                const response = await LoginForm.submit(convertedFormData);
                this.$router.push(this.ReturnUrl)
            }
            catch(e) {
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

    .authSubmitButton {
        margin-top: 15px;
        width: 90%;
    }
}
</style>

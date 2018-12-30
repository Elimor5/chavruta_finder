<template>
    <div class="authSignupComponent">
        <div class="iconContainer">
            <v-ons-icon icon="md-account-add" class="list-item__icon"></v-ons-icon>
        </div>

        <form @submit.prevent="SubmitForm">
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
                            v-model.trim="Form.Username"
                        ></v-ons-input>
                    </template>
                </cf-formgroup>
                <cf-formgroup :validation="$v.Form.Name">
                    <template slot="icon">
                        <v-ons-icon icon="fa-address-card" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="input">
                        <v-ons-input
                            class="inputField"
                            float="true"
                            placeholder="Name"
                            v-model="Form.Name"
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

                <v-ons-list class="levelContainer">
                    <v-ons-list-header>Learning Level (Optional)</v-ons-list-header>
                    <v-ons-list-item
                        v-for="(level, $index) in ['Beginner', 'Intermediate', 'Advanced']"
                        :key="level"
                        tappable
                    >
                        <label class="left">
                            <v-ons-radio
                                :input-id="'radio-' + $index"
                                :value="level"
                                v-model=" Form.Level"
                            ></v-ons-radio>
                        </label>
                        <label :for="'radio-' + $index" class="center">{{ level }}</label>
                    </v-ons-list-item>
                </v-ons-list>
                
                <SubmitButton>Sign Up</SubmitButton>
            </v-ons-list>
        </form>
    </div>
</template>

<script>
import SignupForm from "../../../../scripts/forms/auth/SignupForm.js";
import SubmitButton from "../../../shared/buttons/submit-button/SubmitButton.vue";

export default {
    components: {
        SubmitButton
    },
    data() {
        return {
            Form: SignupForm.getDefaultData()
        };
    },
    validations: SignupForm.getValidations(),
    methods: {
        async SubmitForm() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            this.$loader.show();

            try {
                const convertedFormData = SignupForm.convertFormData(this.Form);

                const response = await SignupForm.submit(convertedFormData);
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

    .levelContainer {
        padding-left: 5px;
    }
}
</style>

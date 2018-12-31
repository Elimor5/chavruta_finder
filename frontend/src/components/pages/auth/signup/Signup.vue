<template>
    <div class="authSignupComponent">
        <div class="iconContainer">
            <template v-if="IsEditMode">
                <v-ons-icon icon="fa-user-edit" class="list-item__icon"></v-ons-icon>
            </template>
            <template v-else>
                <v-ons-icon icon="md-account-add" class="list-item__icon"></v-ons-icon>
            </template>
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
                            type="email"
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
                            v-model.trim="Form.Name"
                        ></v-ons-input>
                    </template>
                </cf-formgroup>
                <cf-formgroup :validation="$v.Form.Password">
                    <template slot="icon">
                        <v-ons-icon icon="fa-key" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="input">
                        <div class="passwordField">
                            <v-ons-input
                                class="inputField"
                                float="true"
                                placeholder="Password"
                                :type=" IsPasswordShown? 'test' : 'password'"
                                v-model="Form.Password"
                            ></v-ons-input>

                            <button
                                type="button"
                                class="eyeIcon"
                                :class="{'active': IsPasswordShown}"
                                @click="ToggleShowPassword"
                            >
                                <v-ons-icon icon="fa-eye" class="list-item__icon"></v-ons-icon>
                            </button>
                        </div>
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
                                :value="$index"
                                v-model=" Form.Level"
                            ></v-ons-radio>
                        </label>
                        <label :for="'radio-' + $index" class="center">{{ level }}</label>
                    </v-ons-list-item>
                </v-ons-list>

                <SubmitButton>
                    <template v-if="IsEditMode">Update Account</template>
                    <template v-else>Sign Up</template>
                </SubmitButton>
            </v-ons-list>
        </form>
    </div>
</template>

<script>
import SignupForm from "../../../../scripts/forms/auth/SignupForm";
import EditUserForm from "../../../../scripts/forms/auth/EditUserForm";

import SubmitButton from "../../../shared/buttons/submit-button/SubmitButton.vue";

export default {
    components: {
        SubmitButton
    },
    created() {
        if (this.IsEditMode) {
            this.Form = EditUserForm.getDefaultData();
        }
    },
    computed: {
        IsLoggedIn() {
            return this.$store.state.identity.isAuthenticated;
        }
    },
    props: {
        IsEditMode: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            Form: SignupForm.getDefaultData(),
            IsPasswordShown: false
        };
    },
    validations: SignupForm.getValidations(),
    methods: {
        ToggleShowPassword() {
            this.IsPasswordShown = !this.IsPasswordShown;
        },
        async SubmitForm() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            this.$loader.show();

            try {
                const convertedFormData = SignupForm.convertFormData(this.Form);

                if (this.IsEditMode) {
                    const response = await EditUserForm.submit(
                        convertedFormData
                    );

                    this.$ons.notification.toast(
                        "Account has been successfully updated.",
                        { timeout: 5000, animation: "ascend" }
                    );
                } else {
                    const response = await SignupForm.submit(convertedFormData);
                    this.$router.push(this.$route.query.returnUrl || "/");
                }
            } catch (e) {
                this.$toastr.toast(e);
            }

            this.$loader.hide();
        }
    },
    watch: {
        IsLoggedIn(newVal) {
            if (!newVal) {
                this.$router.push('/');
            }
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

    .passwordField {
        width: 100%;
        padding-right: 20px;
        position: relative;

        .eyeIcon {
            position: absolute;
            right: 20px;
            bottom: 4px;
            color: gray;
            z-index: 1;
            background: transparent;
            border: none;

            &.active {
                color: $colorPrimary;
            }
        }
    }
}
</style>

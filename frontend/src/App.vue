<template>
    <div id="app">
        <v-ons-page>
            <v-ons-toolbar>
                <div class="left">
                    <v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
                </div>

                <div class="center">Chavruta Finder</div>
            </v-ons-toolbar>

            <p style="text-align: center">
                <v-ons-button @click="$ons.notification.alert('Hello World!')">Click me!</v-ons-button>
            </p>
        </v-ons-page>
    </div>
</template>

<style lang="scss">
</style>

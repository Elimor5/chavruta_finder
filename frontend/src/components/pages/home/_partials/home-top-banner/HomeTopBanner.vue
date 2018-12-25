<template>
    <div class="homeTopBannerComponent">
        <div class="topBannerImage">
            <div class="topBannerLayout">
                <p class="beitSamechDaled">בס״ד</p>

                <div class="headingContainer">
                    <h1 class="header">Chavruta Finder</h1>

                    <h2>"אין התורה נקנית אלא בחבורה"</h2>

                    <h4 class="subHead">"Torah is only acquired in a group"</h4>

                    <h5>-Berakhot 63b</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.topBannerImage {
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("https://s3-us-east-2.amazonaws.com/illumevents1-pro/events/images/000/000/511/original/relig.jpg?1545701061");
    background-size: cover;
    background-repeat: no-repeat;

    .topBannerLayout {
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;

        color: white;

        .beitSamechDaled {
            text-align: right;
            padding-right: 10px;
        }

        .headingContainer {
            text-align: center;

            .header {
                padding-top: 30px;
                font-size: 40px;
            }
        }
    }
}
</style>



<template>
    <div class="userAvatarComponent" :style="{'height': `${Size}px`, 'width': `${Size}px`, 'background-color': Color, 'font-size': `${FontSize}px` }">
        {{Initials}}
    </div>
</template>

<script>
export default {
    props: {
        Size: {
            type: String,
            default: '100'
        },
        Color: {
            type: String,
            default: '#0076ff'
        } 
    },
    computed: {
        Initials() {
            const fullName = this.$store.state.identity.currentUser.userIdentity.name;
            
            return fullName
                .split(' ')
                .map((name) => name[0].toUpperCase())
                .join('') 
        },
        FontSize() {
            return this.Size * 0.5;
        }
    }
}
</script>

<style lang="scss" scoped>
    .userAvatarComponent {
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 50px;
    }
</style>

export const CheckLoggedIn = {
    mounted: {
        CheckLoggedIn(){
            if (!this.$auth.loggedIn) {
                this.$router.push({path:'signin',query :{ to: this.$route.fullPath }});
            }
        }
    }
}
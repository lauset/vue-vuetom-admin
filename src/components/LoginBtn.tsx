import './LoginBtn.scss'

export default defineComponent({
  setup() {
    return () => (
      <>
        <v-btn
          color='secondary'
          class='fixed-login-btn'
          target='_blank'
          rel='nofollow'
          href='/login'
        >
          Sign In
        </v-btn>
      </>
    )
  },
})

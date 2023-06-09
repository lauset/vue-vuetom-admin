import './MenuLink.scss'

export default defineComponent({
  name: 'MenuLink',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: undefined,
    },
    target: {
      type: String,
      required: false,
    },
    to: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const micon = ref('mdi-checkbox-blank-circle-outline')
    return () => (
      <>
        <v-list-item
          to={props.to}
          target={props.target}
          rounded='sm'
          class='vertical-nav-menu-link'
          active-class='bg-gradient-primary white--text'
          prepend-icon={props.icon ?? micon.value}
          title={props.title}
        ></v-list-item>
      </>
    )
  },
})

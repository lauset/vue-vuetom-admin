import {
  defineComponent,
  computed,
  ref,
} from 'vue'
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
      required: true
    }
  },
  setup(props) {
    const micon = ref('mdi-checkbox-blank-circle-outline')
    return () => (
      <>
        <v-list-item
          to={props.to}
          target={props.target}
          class='vertical-nav-menu-link'
          active-class='bg-gradient-primary white--text'
        >
          <v-list-item-icon 
            class={[props.icon ?? 'alternate-icon-small']}>
              {props.icon ?? micon.value}
          </v-list-item-icon>
          <v-list-item-title>{props.title}</v-list-item-title>
        </v-list-item>
      </>
    )
  },
})


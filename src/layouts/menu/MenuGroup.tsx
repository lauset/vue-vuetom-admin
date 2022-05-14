import {
  defineComponent,
  computed,
  ref,
  renderSlot,
  h,
  getCurrentInstance,
} from 'vue'
import './MenuGroup.scss'

export default defineComponent({
  name: 'MenuGroup',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const show = ref(false)
    const ricon = ref('mdi-chevron-right')
    const classes = ref('close-list')
    const ss = {
      activator: () => <v-list-item-title>{props.title}</v-list-item-title>,
    }
    const handleShow = () => {
      show.value = !show.value
      ricon.value = show.value ? 'mdi-chevron-down' : 'mdi-chevron-right'
      classes.value = show.value ? 'open-list' : 'close-list'
    }
    return () => (
      <>
        <div class='vertical-nav-menu-group'>
          <div onClick={() => handleShow()}>
            <v-list-item
              to={props.to}
              class={[classes.value, 'vertical-nav-menu-link parent']}
              active-class='bg-gradient-primary white--text'
            >
              <v-list-item-icon class={[props.icon ?? 'alternate-icon-small']}>
                {props.icon}
              </v-list-item-icon>
              <v-list-item-title>{props.title}</v-list-item-title>
              <v-list-item-icon class='vertical-nav-menu-ricon'>
                {ricon.value}
              </v-list-item-icon>
            </v-list-item>
          </div>

          <div v-show={show.value} class='vertical-nav-menu-list'>
            {
              // slots.default?.()
              slots.default && slots.default()
            }
          </div>
        </div>
      </>
    )
  },
})

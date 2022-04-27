import {
  defineComponent,
  computed,
  ref,
  renderSlot,
  h,
  getCurrentInstance,
  defineAsyncComponent,
  resolveComponent,
} from 'vue'
import './MenuGroup.scss'

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
  },
  setup(props, { slots }) {
    const ss = {
      prependIcon: () => (
        <h3></h3>
      ),
      activator: () => <v-list-item-title>{props.title}</v-list-item-title>,
    }
    return () => (
      <>
        <v-list-group
          ref='refVListGroup'
          class='vertical-nav-menu-group text-primary'
          v-slots={ss}
        >
          {
            // slots.default?.()
            slots.default && slots.default()
          }
        </v-list-group>
      </>
    )
  },
})

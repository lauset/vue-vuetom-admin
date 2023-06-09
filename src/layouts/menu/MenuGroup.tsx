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
      default: 'mdi-file-outline',
    },
  },
  setup(props, { emit, slots }) {
    // const show = ref(false)
    const open = ref([''])
    // const ricon = ref('mdi-chevron-right')
    // const classes = ref('close-list')
    // const ss = {
    //   activator: () => <v-list-item-title>{props.title}</v-list-item-title>,
    // }
    // const handleShow = () => {
    //   show.value = !show.value
    //   ricon.value = show.value ? 'mdi-chevron-down' : 'mdi-chevron-right'
    //   classes.value = show.value ? 'open-list' : 'close-list'
    // }
    return () => (
      <>
        <div class='vertical-nav-menu-group'>
          <v-list opened={open.value}>
            <v-list-group value={props.title}>
              {{
                activator: (p: any) => (
                  <v-list-item
                    {...p.props}
                    class='vertical-nav-menu-link parent'
                    prepend-icon={props.icon}
                    title={props.title}
                  ></v-list-item>
                ),
                default: () => (
                  <>
                    {
                      // slots.default?.()
                      slots.default && slots.default()
                    }
                  </>
                ),
              }}
            </v-list-group>
          </v-list>
        </div>
      </>
    )
  },
})

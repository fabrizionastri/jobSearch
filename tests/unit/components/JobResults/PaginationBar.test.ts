import { shallowMount } from '@vue/test-utils'

import PaginationBar from '@/components/JobResults/PaginationBar.vue' // change this path to the path of your component
import { RouterLinkStub } from '@vue/test-utils'

describe('PaginationBar.vue', () => {
  it('renders "Page X / Y" when `currentPage` and `lastPage` props are passed', async () => {
    const wrapper = shallowMount(PaginationBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        currentPage: 1,
        lastPage: 10,
        previousPage: null,
        nextPage: 2
      }
    })

    expect(wrapper.text()).toContain('Page 1 / 10')
  })

  it('shows Next link when `nextPage` prop is passed', () => {
    const wrapper = shallowMount(PaginationBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        currentPage: 1,
        lastPage: 10,
        previousPage: null,
        nextPage: 2
      }
    })

    expect(wrapper.find('[role="link"]').text()).toContain('Next')
  })

  it('does not show Previous link when `previousPage` prop is null', () => {
    const wrapper = shallowMount(PaginationBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        currentPage: 1,
        lastPage: 10,
        previousPage: null,
        nextPage: 2
      }
    })

    expect(wrapper.findAll('[role="link"]').length).toBe(1)
  })
})

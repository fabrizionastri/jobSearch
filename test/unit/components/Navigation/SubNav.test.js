import { render, screen } from '@testing-library/vue';

import SubNav from '@/components/Navigation/SubNav.vue';
import { describe } from 'vitest';

describe('SubNav', () => {
  const renderSubNav = (routeName) => {
    const $route = { // this is a hand made object to mock the real $route object from Vitest
      name: routeName
    }
    render(SubNav, {
      global: {
        mocks: { // this allows us to mock the $route object on the this.$route
          $route
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  describe('when user in on jobs page', () => {
    it('displays job count', () => {
      renderSubNav('JobResults')
      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user in NOT on jobs page', () => {
    it('does NOT display job count', () => {
      renderSubNav('Home')
      const jobCount = screen.queryByText('1653') // remember to use queryByText instead of getByText to avoid throwing an error
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})

import { render, screen } from '@testing-library/vue';

import SubNav from '@/components/Navigation/SubNav.vue';
import { describe } from 'vitest';

describe('SubNav', () => {
  describe('when user in on jobs page', () => {
    it('displays job count', () => {
      const $route = { // this is a hand made object to mock the real $route object from Vitest
        name: 'JobResults'
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
      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user in NOT on jobs page', () => {
    it('does NOT display job count', () => {
      const $route = { // this is a hand made object to mock the real $route object from Vitest
        name: 'Home'
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
      const jobCount = screen.queryByText('1653') // remember to use queryByText instead of getByText to avoid throwing an error
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})

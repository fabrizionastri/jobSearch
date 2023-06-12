import { render, screen } from '@testing-library/vue';

import SubNav from '@/components/SubNav.vue';
import { describe } from 'vitest';

describe('SubNav', () => {
  describe('when user in on jobs page', () => {
    it('displays job count', () => {
      render(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {
            onJobResultsPage: true
          }
        }
      })
      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user in NOT on jobs page', () => {
    it('does not display job count', () => {
      render(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {

            onJobResultsPage: false
          }
        }
      })
      const jobCount = screen.queryByText('1653') // remember to use queryByText instead of getByText to avoid throwing an error
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})

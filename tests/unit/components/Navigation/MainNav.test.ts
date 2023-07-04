import {
  render, // render component in virtual DOM
  screen // get elements from the virtual DOM
} from '@testing-library/vue'
import { Mock } from 'vitest'
import userEvent from '@testing-library/user-event' // this is used to simulate user events
import { RouterLinkStub } from '@vue/test-utils' // this is used to stub the router-link component
import MainNav from '@/components/Navigation/MainNav.vue' // don't use {} because its the default export

import { createTestingPinia } from '@pinia/testing' // this is used to create a test version of a new Pinia store for each test

import { useUserStore } from '@/stores/user' // this is used to get the user store

import { useRoute } from 'vue-router'
vi.mock('vue-router') // mock out the whole vue-router module
const useRoutMock = useRoute as Mock

describe('MainNav', () => {
  const renderMainNav = (/* routeName */) => {
    // this is used to create a test version of a new Pinia store for each test
    const pinia = createTestingPinia({
      stubActions: true // we can remove this, because stubbing out actions is the default option for createTestingPinia
    })
    useRoutMock.mockReturnValue({ name: 'Home' })
    // const $route = { // this is a hand made object to mock the real $route object from Vitest
    //   name: routeName
    // }
    render(MainNav, {
      // this renders the component in the virtual DOM
      global: {
        plugins: [pinia], // this is used to add the test version of the Pinia store to the global object
        // mocks: { // this allows us to mock the $route object on the this.$route
        //   $route
        // },
        stubs: {
          // this is used to stub the components that are used inside the component that is being tested
          // stubs are used to replace the component with a fake component
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub, // this is used to stub the router-link component, and replace it with RouterLinkStub, which is specifically made for testing
        }
      }
    })
  }

  it('displays the company name', () => {
    renderMainNav(/* 'Home' */)
    // screen.debug() // this is used to print the DOM to the console
    const companyName = screen.getByText(/FlexUp careers/i) // this is used to get the text from the DOM
    expect(companyName).toBeInTheDocument // this is rendant with the getByText, because that will already fail if there is not exactly 1 element with that text
  })

  it('displays menu items for navigation', () => {
    renderMainNav(/* 'Home' */)
    const navigationMenuItems = screen.getAllByRole('listitem') // this is used to get all the elements with the role listitem
    const navigationMenuItemsText = navigationMenuItems.map((item) => item.textContent) // this is used to get the text from the elements
    expect(navigationMenuItemsText).toEqual([
      'Teams',
      'Locations',
      'Life at Google',
      'How we hire',
      'Students',
      'Jobs'
    ]) // this is used to check if the text is the same as the array
  })

  describe('when the user logs in', () => {
    it('does not display the profile picture before login', async () => {
      renderMainNav()
      // queryByRole is the same as getByRole but it doesn't throw an error if the element is not found
      // use queryByRole instead of getByRole to return null if not found
      const userStore = useUserStore() // this is used to get the user store
      let profileImage = screen.queryByRole('img', {
        // this second argument is the configuration object
        name: /User profile image/i // for an image, the name is the alt attribute
        // the `/.../i` is a regular expression, the i is for case insensitive
      })
      expect(profileImage).not.toBeInTheDocument // this is used to check if the element is not in the DOM
      // })
      // it('displays the profile picture after login', async () => {
      const loginButton = screen.getByRole('button', {
        name: /Sign in/i // for a button, the name is the text inside the button
      })
      userStore.isLoggedIn = true // this is used to manually set the user as logged in, simulating the component behaviour
      await userEvent.click(loginButton) // this is used to simulate a click on the button

      profileImage = screen.getByRole('img', { name: /User profile image/i }) // will thrown an error if not found, more strict that queryByRole, because at this stage the component should be found
      expect(profileImage).toBeInTheDocument
    })
  })

  describe('when the user is not logged in', () => {
    it('displays the login button', () => {
      renderMainNav()
      screen.queryByRole('button', { name: 'ActionButton' })
    })
  })
})

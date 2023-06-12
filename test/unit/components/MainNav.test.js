import {
  render, // render component in virtual DOM
  screen // get elements from the virtual DOM
} from '@testing-library/vue'

import userEvent from '@testing-library/user-event' // this is used to simulate user events

import MainNav from '@/components/MainNav.vue' // don't use {} because its the default export
import { describe } from 'vitest'

describe('MainNav', () => {
  it('displays the company name', () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    }) // this renders the component in the virtual DOM
    // screen.debug() // this is used to print the DOM to the console
    const companyName = screen.getByText('Bobo carrers') // this is used to get the text from the DOM
    expect(companyName).toBeInTheDocument // this is rendant with the getByText, because that will already fail if there is not exactly 1 element with that text
  })

  it('displays the SuperCorp company name', () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      data() {
        return {
          company: 'SuperCorp'
        }
      }
    })
    const companyName = screen.getByText('SuperCorp')
    expect(companyName).toBeInTheDocument
  })

  it('displays menu items for navigation', () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
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
    it('shoud not display the user profile picture when not Logged In', async () => {
      render(MainNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })
      // queryByRole is the same as getByRole but it doesn't throw an error if the element is not found
      // use queryByRole instead of getByRole to return null if not found
      let profileImage = screen.queryByRole('img', {
        // this second argument is the configuration object
        name: /User profile image/i // for an image, the name is the alt attribute
        // the `/.../i` is a regular expression, the i is for case insensitive
      })
      expect(profileImage).not.toBeInTheDocument // this is used to check if the element is not in the DOM
      const loginButton = screen.getByRole('button', {
        name: /Sign in/i // for a button, the name is the text inside the button
      })
      await userEvent.click(loginButton) // this is used to simulate a click on the button

      profileImage = screen.getByRole('img', { name: /User profile image/i }) // will thrown an error if not found, more strict that queryByRole, because at this stage the component should be found
      expect(profileImage).toBeInTheDocument
    })
  })

  describe('when the user is not logged in', () => {
    it('displays the login button', () => {
      render(MainNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })
      screen.queryByRole('button', { name: 'ActionButton' })
    })
  })
})

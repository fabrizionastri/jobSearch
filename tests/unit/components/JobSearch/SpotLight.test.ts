import { render, screen } from '@testing-library/vue'
import axios from 'axios'
import SpotLight from '@/components/JobSearch/SpotLight.vue'
import { beforeEach } from 'vitest'

vi.mock('axios')
import type { Mock } from 'vitest'

const axiosGetMock = axios.get as Mock

axiosGetMock.mockResolvedValue({
  data: [
    {
      id: 1,
      title: 'Title 1',
      img: 'Image 1',
      description: 'Description 1'
    },
    {
      id: 2,
      title: 'Title 2',
      img: 'Image 2',
      description: 'Description 2'
    }
  ]
})

describe('SpotLight', () => {
  beforeEach(() => {
    render(SpotLight, {
      slots: {
        default: `<template #default="{ spotlight }">
        <h1>{{ spotlight.title }}</h1>
        <p>{{ spotlight.description }}</p>
        <h2>{{ spotlight.img }}</h2>
        </template>`
      }
    })
  })
  it('should call the axios.get function', () => {
    const baseURL = import.meta.env.VITE_API_URL
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}/spotlights`)
  })
  it('should render Image from API', async () => {
    const result = await screen.findByText('Image 1')
    expect(result).toBeInTheDocument()
  })
  it('should render Description from API', async () => {
    const result = await screen.findByText('Description 2')
    expect(result).toBeInTheDocument()
  })
  it('should render Title from API', async () => {
    const result = await screen.findByText('Title 1')
    expect(result).toBeInTheDocument()
  })
})

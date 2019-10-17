import React from 'react'
import {render} from 'react-dom'
import {act} from 'react-dom/test-utils'
import {Case} from '../src'

describe('Case', () => {
  it('renders element children', () => {
    const container = document.createElement('div')
    act(() => {
      render(
        <Case variant="A">Variant A</Case>,
        container
      )
    })
    expect(container.textContent).to.equal('Variant A')
  })

  it('renders function children', () => {
    const container = document.createElement('div')
    act(() => {
      render(
        <Case variant="A" value={{flagKey: 'test'}}>
          {({flagKey}) => `Flag: ${flagKey}`}
        </Case>,
        container
      )
    })
    expect(container.textContent).to.equal('Flag: test')
  })
})
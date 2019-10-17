import React from 'react'
import {render} from 'react-dom'
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import {Switch, Case, Provider} from '../src'
import {FlagrContext} from '../src/Context'

describe('Switch', () => {
  it('renders first matching Case', () => {
    const container = document.createElement('div')
    act(() => {
      render(
        <Provider flags={{test: {variantKey: 'A'}}} entityId="" url="/">
          <Switch flagKey="test">
            <Case variant="A">Variant A</Case>
            <Case variant="A">Variant A2</Case>
            <Case variant="B">Variant B</Case>
          </Switch>
        </Provider>,
        container
      )
    })
    expect(container.textContent).to.equal('Variant A')
  })

  it('renders default Case if there are no matches', () => {
    const container = document.createElement('div')
    act(() => {
      render(
        <Provider flags={{test: {variantKey: 'C'}}} entityId="" url="/">
          <Switch flagKey="test">
            <Case variant="A">Variant A</Case>
            <Case variant="B">Variant B</Case>
            <Case>Default</Case>
          </Switch>
        </Provider>,
        container
      )
    })
    expect(container.textContent).to.equal('Default')
  })

  it('passes flag result to Case', () => {
    const container = document.createElement('div')
    act(() => {
      render(
        <Provider flags={{test: {variantKey: 'A'}}} entityId="" url="/">
          <Switch flagKey="test">
            <Case variant="A">{(flag) => `Variant ${flag.variantKey}`}</Case>
          </Switch>
        </Provider>,
        container
      )
    })
    expect(container.textContent).to.equal('Variant A')
  })

  it('requests flag from server if not cached', () => {
    const container = document.createElement('div')
    const mockContext = {
      flags: {},
      fetchFlag: sinon.stub().returns({variantKey: 'A'})
    }
    act(() => {
      render(
        <FlagrContext.Provider value={mockContext}>
          <Switch flagKey="test">
            <Case variant="A">Variant A</Case>
          </Switch>
        </FlagrContext.Provider>,
        container
      )
    })
    expect(mockContext.fetchFlag.called).to.be.ok
  })
})
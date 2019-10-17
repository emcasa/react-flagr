import React, {PureComponent} from 'react'
import {render} from 'react-dom'
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import * as lib from '../src/lib'
import {Provider, withFlagr} from '../src'

const FlagrTestConsumer = withFlagr(
  class extends PureComponent {
    componentDidMount() {
      this.props.fetchFlag('test')
    }

    render() {
      const flag = this.props.flags['test']
      return flag ? flag.variantKey : null
    }
  }
)

describe('Provider', () => {
  before(() => {
    sinon.stub(lib, 'fetchFlag').returns(Promise.resolve({variantKey: 'test'}))
  })

  after(() => {
    lib.fetchFlag.restore()
  })

  it('updates flags with fetchFlag', async () => {
    const container = document.createElement('div')
    await act(async () => {
      render(
        <Provider entityId="" url="/">
          <FlagrTestConsumer />
        </Provider>,
        container
      )
      // Wait for fetchFlag to resolve
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(container.textContent).to.equal('test')
  })
})
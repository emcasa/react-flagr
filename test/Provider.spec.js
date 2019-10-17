import React, {PureComponent} from 'react'
import {render} from 'react-dom'
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import * as flagr from '../src/flagr'
import {Provider, withFlag} from '../src'

const FlagrTestConsumer = withFlag('test')(({flag}) => (
  flag ? flag.variantKey : null
))

describe('Provider', () => {
  before(() => {
    sinon.stub(flagr, 'fetchFlag').returns(Promise.resolve({variantKey: 'test'}))
  })

  after(() => {
    flagr.fetchFlag.restore()
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
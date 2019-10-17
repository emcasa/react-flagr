import React, {PureComponent} from 'react'
import hoistStatics from 'hoist-non-react-statics'
import {Consumer} from './Context'

export default (Target) =>
  hoistStatics(
    class extends PureComponent {
      static displayName = `withFlagr(${Target.displayName || Target.name || 'Component'})`

      render() {
        return (
          <Consumer>
            {(ctx) => <Target {...this.props} {...ctx} />}
          </Consumer>
        )
      }
    },
    Target
  )
import React, {PureComponent} from 'react'
import hoistStatics from 'hoist-non-react-statics'
import withFlagr from './withFlagr'

const getFlagKey = (flagKey, props) => (
  typeof flagKey === 'function'
  ? flagKey(props)
  : flagKey
)

export default (flagKey, mapFlagToProps = (flag) => ({flag})) => (Target) =>
  withFlagr(hoistStatics(
    class extends PureComponent {
      state = {}

      static displayName = `withFlag(${Target.displayName || Target.name || 'Component'})`

      static getDerivedStateFromProps(props) {
        return {flag: props.flags[getFlagKey(flagKey, props)]}
      }

      componentDidMount() {
        const {fetchFlag} = this.props
        if (!this.state.flag) fetchFlag(getFlagKey(flagKey, this.props))
      }

      render() {
        const {...props} = this.props
        const {flag} = this.state
        delete props.flags
        delete props.fetchFlag
        return <Target {...props} {...mapFlagToProps(flag)} />
      }
    },
    Target
  ))
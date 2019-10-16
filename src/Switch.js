import React, {PureComponent} from 'react'
import {withFlagr} from './Context'

class FlagrSwitch extends PureComponent {
  state = {}

  static getDerivedStateFromProps({flags, flagKey}) {
    return {
      result: flags[flagKey]
    }
  }

  componentDidMount() {
    const {fetchFlag, flagKey} = this.props
    if (!this.state.result) fetchFlag(flagKey)
  }

  renderVariant(flag) {
    const {children} = this.props
    return React.Children.map(children, (child) => {
      if (child && (child.props.variant === flag.variant || !child.props.variant)) {
        return React.cloneElement(child, {value: flag})
      }
    })
  }

  render() {
    const {LoadingComponent} = this.props
    const {result} = this.state
    if (result) return this.renderVariant(result)
    else if (LoadingComponent) return <LoadingComponent />
    else return null
  }
}

export default withFlagr(FlagrSwitch)

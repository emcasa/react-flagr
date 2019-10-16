import React, {PureComponent} from 'react'
import {withFlagr} from './Context'
import Case from './Case'

const isFlagrCase = (variant) => (element) => (
  element && (!element.props.variant || element.props.variant === variant)
)

const assertFlagrCaseElement = (element) => {
  if (element && element.type !== Case)
    throw new Error('Only instances of FlagrCase are allowed as children of FlagrSwitch.')
}

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
    const children = React.Children.toArray(this.props.children)
    children.forEach(assertFlagrCaseElement)
    return children.filter(isFlagrCase(flag.variantKey)).shift()
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

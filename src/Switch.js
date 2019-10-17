import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import withFlag from './withFlag'
import Case from './Case'

const isFlagrCase = (variant) => (element) => (
  element && (!element.props.variant || element.props.variant === variant)
)

const assertFlagrCaseElement = (element) => {
  if (element && element.type !== Case)
    throw new Error('Only instances of FlagrCase are allowed as direct children of FlagrSwitch.')
}

class FlagrSwitch extends PureComponent {
  static propTypes = {
    flagKey: PropTypes.string.isRequired
  }

  renderVariant(flag) {
    const children = React.Children.toArray(this.props.children)
    children.forEach(assertFlagrCaseElement)
    const element = children.filter(isFlagrCase(flag.variantKey)).shift()
    if (element) return React.cloneElement(element, {value: flag})
    else return null
  }

  render() {
    const {LoadingComponent, flag} = this.props
    if (flag) return this.renderVariant(flag)
    else if (LoadingComponent) return <LoadingComponent />
    else return null
  }
}

export default withFlag((props) => props.flagKey)(FlagrSwitch)

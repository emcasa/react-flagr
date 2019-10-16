import React, {createContext, PureComponent} from 'react'
import PropTypes from 'prop-types'
import * as lib from './lib'

export const FlagrContext = createContext({
  flags: {},
  fetchFlag: () => null
})

class FlagrProvider extends PureComponent {
  static propTypes = {
    flags: PropTypes.object.isRequired,
    entityId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    fetch: PropTypes.func
  }

  static defaultProps = {
    flags: {}
  }

  state = {
    flags: this.props.flags,
    fetchFlag: this.fetchFlag
  }

  componentDidUpdate(prevProps) {
    if(prevProps.flags !== this.props.flags)
    this.setState({
      flags: {
        ...this.state.flags,
        ...this.props.flags
      }
    })
  }

  fetchFlag = async (flagKey) => {
    const flag = await lib.fetchFlag(flagKey, this.props.entityId, this.props)
    this.setState((state) => ({
      ...state,
      flags: {...state.flags, [flagKey]: flag}
    }))
  }

  render() {
    return (
      <FlagrContext.Provider value={this.state}>
        {this.props.children}
      </FlagrContext.Provider>
    )
  }
}

export const Provider = FlagrProvider

export const withFlagr = (Target) => (props) => (
  <FlagrContext.Consumer>
    {(ctx) => <Target {...props} {...ctx} />}
  </FlagrContext.Consumer>
)
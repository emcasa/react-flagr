import React, {createContext, PureComponent} from 'react'
import PropTypes from 'prop-types'
import * as flagr from './flagr'

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

  state = this.props.flags

  componentDidUpdate(prevProps) {
    if(prevProps.flags !== this.props.flags)
    this.setState({
      ...this.state,
      ...this.props.flags
    })
  }

  getContext = () => ({
    flags: this.state,
    fetchFlag: this.fetchFlag
  })

  fetchFlag = async (flagKey) => {
    const flag = await flagr.fetchFlag(flagKey, this.props.entityId, this.props)
    this.setState((state) => ({...state, [flagKey]: flag}))
  }

  render() {
    return (
      <FlagrContext.Provider value={this.getContext()}>
        {this.props.children}
      </FlagrContext.Provider>
    )
  }
}

export const Provider = FlagrProvider
export const Consumer = FlagrContext.Consumer

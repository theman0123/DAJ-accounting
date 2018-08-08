import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      search: ''
    }
  }
    
  handleInput = (e) => {
    e.preventDefault()
    this.setState({search: e.target.value})
  }
  
  handleKeyPress = (e) => {
    (e.key === 'Enter')
      ? this.props.handleSearch(this.state.search)
      : null
  }
  
  render() {
    return (
      <input
        style={styles.input}
        onChange={this.handleInput}
        value={this.state.search}
        placeholder="Search by name or email"
        onKeyPress={this.handleKeyPress}>
      </input>
    )
  }
}

const styles = {
  input: {
    padding: '.25em',
    fontSize: '1.5em',
    fontFamily: 'Roboto, serif, Arial',
    color: '#7F8081',
    maxWidth: '12em',
  }
}
import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

  state = {
    users: [],
    username: ""
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({ users: res.data })
  }

  deleteUser = async (id) => {
    await axios.delete('http://localhost:4000/api/users/' + id)
    this.getUsers()
  }

  async componentDidMount() {
    this.getUsers()
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:4000/api/users', {
      username: this.state.username
    })
    this.getUsers()
    this.setState({username: ""})
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Crear nuevo usuario</h3>
            <form onSubmit={this.onSubmitForm}>
              <div className="form-group">
                <input type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername} />
              </div>
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {
              this.state.users.map(user => (
                <li className="list-group-item list-group-item-action" 
                    key={user._id}
                    onDoubleClick={() => this.deleteUser(user._id)}>
                  {user.username}
                </li>)
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

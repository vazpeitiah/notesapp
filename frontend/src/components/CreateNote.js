import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

  state = {
    users: [],
    title: '',
    content: '',
    userSelected: '',
    date: new Date(),
    editing: false,
    _id: ''
  }

  async componentDidMount(){
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0].username
    })

    if(this.props.match.params.id){
      const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
      this.setState({
        editing: true,
        _id: this.props.match.params.id,
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author
      })
    }
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = date => {
    this.setState({date})
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected
    }
    if(this.state.editing){
      await axios.put('http://localhost:4000/api/notes/'+this.state._id, newNote)
    }else{
      await axios.post('http://localhost:4000/api/notes', newNote)
    }
    window.location.href = '/';
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Crear una nota</h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <select name="userSelected"
                      className="form-control"
                      value={this.state.date}
                      onChange={this.onInputChange}>
                {
                  this.state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>)
                  )
                }
              </select>
            </div>

            <div className="form-group">
              <input type="text"
                     className="form-control"
                     placeholder="Titulo"
                     name="title"
                     required
                     value={this.state.title}
                     onChange={this.onInputChange}/>
            </div>

            <div className="form-group">
              <textarea name="content"
                        className="form-control"
                        placeholder="Descripción de la tarea"
                        required
                        value={this.state.content}
                        onChange={this.onInputChange}>
              </textarea>
            </div>

            <div className="form-group">
              <DatePicker className="form-control"
                          name="date"
                          selected={this.state.date}
                          onChange={this.onChangeDate}/>
            </div>
          
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    )
  }
}
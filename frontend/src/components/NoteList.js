import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NoteList extends Component {

  state = {
    notes: []
  }

  async getNotes() {
    const res = await axios.get('http://localhost:4000/api/notes')
    this.setState({ notes: res.data })
  }

  componentDidMount() {
    this.getNotes()
  }

  deleteNote = async (id) => {
    await axios.delete('http://localhost:4000/api/notes/' + id)
    this.getNotes()
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
            <div className="col-md-4 p-2" key={note._id}>
              <div className="card">
                <div className="card-header">
                  <h5>{note.title}</h5>
                </div>
                <div className="card-body">
                  {note.content}
                  <p>{note.author}</p>
                  <p>{format(note.date)}</p>
                </div>
                <div className="card-footer">
                  <Link className="btn btn-secondary mr-2"
                        to={"edit/" + note._id}>
                    Editar
                  </Link>
                  <button className="btn btn-danger"
                    onClick={() => this.deleteNote(note._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div> )
          )
        }
      </div>
    )
  }
}

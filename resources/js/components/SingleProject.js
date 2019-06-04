import axios from 'axios'
import React, { Component } from 'react'

export default class SingleProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {},
            tasks: [],
            title: '',
            errors: []
        }

        this.handleMarkProjectAsCompleted = this.handleMarkProjectAsCompleted.bind(
            this
        )
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleAddNewTask = this.handleAddNewTask.bind(this)
    }

    handleMarkProjectAsCompleted() {
        const { history } = this.props
        axios
            .put(`/projects/${this.state.project.id}`)
            .then(response => history.push('/'))
    }

    componentDidMount() {
        const projectId = this.props.match.params.id
        axios.get(`/projects/${projectId}`).then(response => {
            this.setState({
                project: response.data,
                tasks: response.data.tasks
            })
        })
    }

    handleFieldChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleAddNewTask(event) {
        event.preventDefault()

        const task = {
            title: this.state.title,
            project_id: this.state.project.id
        }

        axios
            .post('/tasks', task)
            .then(response => {
                // clear form input
                this.setState({
                    title: ''
                })
                // add new task to list of tasks
                this.setState(prevState => ({
                    tasks: prevState.tasks.concat(response.data)
                }))
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleMarkTaskAsCompleted(taskId) {
        axios.put(`/tasks/${taskId}`).then(response => {
            this.setState(prevState => ({
                tasks: prevState.tasks.filter(task => {
                    return task.id !== taskId
                })
            }))
        })
    }

    render() {
        const { project, tasks } = this.state

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-0">
                            <div className="container card-header-custom d-flex justify-content-between align-items-center">
                                <div>{project.name}</div>
                                <div>
                                    <button
                                        className="btn btn-success mark-as-complete shadow"
                                        onClick={this.handleMarkProjectAsCompleted.bind(
                                            this,
                                            project.id
                                        )}
                                    >
                                        <i className="fas fa-check" />
                                    </button>
                                </div>
                            </div>
                            <div className="project-description">
                                <p>{project.description}</p>
                            </div>
                            <div className="card-body border-0">
                                <form onSubmit={this.handleAddNewTask}>
                                    <div className="d-flex justify-content-around align-content-center">
                                        <input
                                            className="add-task-form shadow"
                                            type="text"
                                            name="title"
                                            placeholder="Add task.."
                                            value={this.state.title}
                                            onChange={this.handleFieldChange}
                                        />
                                        <button className="add-task-btn ml-2 shadow">
                                            <i className="fas fa-plus" />
                                        </button>
                                    </div>
                                </form>

                                <ul className="list-group mt-3">
                                    {tasks.map(task => (
                                        <li
                                            className="list-group-item-custom shadow d-flex justify-content-between align-items-center"
                                            key={task.id}
                                        >
                                            {task.title}

                                            <button
                                                className="btn btn-sm btn-success mark-as-complete shadow"
                                                onClick={this.handleMarkTaskAsCompleted.bind(
                                                    this,
                                                    task.id
                                                )}
                                            >
                                                <i className="fas fa-check" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

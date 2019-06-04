import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchField from './SearchField'

export default class ProjectsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            searchFieldV: ''
        }
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    componentDidMount() {
        axios.get('projects').then(response => {
            this.setState({
                projects: response.data
            })
        })
    }

    onSearchChange(event) {
        console.log()
        this.setState({
            searchFieldV: event.target.value
        })
    }

    render() {
        const projects = this.state.projects.filter(project => {
            if (
                project.name
                    .toLowerCase()
                    .includes(this.state.searchFieldV.toLowerCase())
            )
                return project
        })
        return (
            <div className="container py-2">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="d-flex justify-content-center pb-4">
                            <SearchField searchChange={this.onSearchChange} />
                        </div>
                        <div className="card border-0">
                            <div className="card-header-custom">Projects</div>
                            <div className="card-body ">
                                <ul className="list-group list-group-flush">
                                    {projects.map(project => (
                                        <Link
                                            className="list-group-item-custom shadow list-group-item-action d-flex justify-content-between align-items-center"
                                            to={`/projects/${project.id}`}
                                            key={project.id}
                                        >
                                            {project.name}
                                            <span className="badge badge-primary badge-pill">
                                                {project.tasks_count}
                                            </span>
                                        </Link>
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

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import ProjectsList from './ProjectsList'
import NewProject from './NewProject'
import SingleProject from './SingleProject'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="d-flex justify-content-center align-items-center p-4">
                    <div className="container bg-white shadow p-3">
                        <Header />
                        <Switch>
                            <Route exact path="/" component={ProjectsList} />
                            <Route path="/create" component={NewProject} />
                            <Route
                                path="/projects/:id"
                                component={SingleProject}
                            />
                        </Switch>
                        <div className="row footer">
                            Copyright @{'  '}
                            <a
                                style={{ textDecoration: 'none' }}
                                href="https://eneajaho.me"
                            >
                                Enea
                            </a>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))

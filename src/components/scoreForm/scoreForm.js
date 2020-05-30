import React from 'react';

export default class scoreForm extends React.Component {

    state = {
        name: '',
        lowestHighScore: ''
    }

    formSubmit = e => {
        e.preventDefault()

        this.props.scoreSubmit(this.state.name)
        // todo: generate score list in game component
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formSubmit}>
                    <input placeholder='Enter Your Name...' type='text' onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
                    <button>Submit Score</button>
                </form>
            </div>
        )
    }
}


import React from 'react';
import './scoreForm.css';

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
            <div className='form-div'>
                <form onSubmit={this.formSubmit}>
                    <h2 id='my-score'>Enter Your Name</h2>
                    <input id='name' placeholder='Enter Your Name...' type='text' onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
                    <button id='submit-btn'>Submit Score</button>
                </form>
            </div>
        )
    }
}


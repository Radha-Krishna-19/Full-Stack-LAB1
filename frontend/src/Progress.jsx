import React, { Component } from 'react'
import './Progress.css'

class Progress extends Component {
    render() {
        const { completed } = this.props

        return (
            <div className="progress">
                <h2 className="progress-title">🎉 You've Learned {completed.length} Things!</h2>
                <div className="progress-items">
                    {completed.length > 0 ? (
                        completed.map((item, i) => (
                            <div key={i} className="progress-badge">{item}</div>
                        ))
                    ) : (
                        <p className="progress-empty">Start learning to see your progress! 🚀</p>
                    )}
                </div>
            </div>
        )
    }
}

export default Progress

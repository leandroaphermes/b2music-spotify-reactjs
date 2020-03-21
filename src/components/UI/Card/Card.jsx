import React from 'react'

export default function Card(props) {
    return (
        <section className="card">
            <header className="card-header">
                <h4 className="card-title">{props.title}</h4>
                { props.options &&
                    <div className="card-options">
                        {props.options}
                    </div>
                }
                { props.small &&
                    <small>{props.small}</small>
                }
            </header>
            <article>
                
            </article>
        </section>
    )
}

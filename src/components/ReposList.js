import React from 'react'
import {Card  } from 'react-bootstrap';

const ReoisList = ({repos}) => {
    return (
        <div>
            {repos.map((r, index) => {
                return <Card key={index}>
                        <Card.Header>
                        <a href={r.full_name}>{r.full_name}</a>
                        </Card.Header>
                        <Card.Body>
                        <Card.Text>
                            "{r.html_url}"
                        </Card.Text>
                        </Card.Body>
                    </Card>
            })}
        </div>
    )
}

export default ReoisList

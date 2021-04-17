import React from 'react'
import {Card  } from 'react-bootstrap';

const ReposList = ({repos}) => {

        return (
        <div>
            {repos.map((r, index) => {
                return <Card key={index} className="mb-3">
                        <Card.Header>
                        <a href={r.full_name}>{r.full_name}</a>
                        </Card.Header>
                        <Card.Body>
                        <Card.Text>
                            {r.description}
                        </Card.Text>
                        <Card.Text>
                            stars :  <a href="#">{r.stargazers_count}</a>
                        </Card.Text>
                        </Card.Body>
                    </Card>
            })}
        </div>
    )
}

export default ReposList

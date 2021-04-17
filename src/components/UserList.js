import React from 'react';
import './UserList.css';
import { Card, Tab, Row, Col  } from 'react-bootstrap';


const UserList = ({users}) => {
    console.log(users );

    return (
        <div>
            <h1 className="text-center">Users</h1><br/>
            {users.map((u, index) => {
                return <Card key={index} className="mb-3">
                        <Tab.Container  id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col className="col-img" sm={3} lg={3}>
                                    <img src={u.avatar_url} alt="avartar" />
                                </Col>
                                <Col className="col-text" sm={9} lg={9}>
                                    <a href="#">Name: {u.login}</a>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
            })}
        </div>
    );
}
export default UserList

import React from 'react';
import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import {Divider} from "primereact/divider";

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    return (
        <Segment style={{background: '#17212f'}} raised inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <div className="header">
                    <Header as='h1' inverted style={{color: "white", background: "#17212f", marginBottom:10}}>
                        Activities {/*<Image size='massive' src='/assets/logo.png' alt='Logo' style={{marginBottom: 12}}/>*/}
                    </Header>
                </div>
                <div className="row">
                    {userStore.isLoggedIn ? (
                        <>
                            <Button as={Link} to='/activities' size='huge'>
                                Go to activities
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>
                                Login
                            </Button>

                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted>
                                Register
                            </Button>
                        </>
                    )}
                </div>
                <Divider/>
            </Container>
        </Segment>
    )
})

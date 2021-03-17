import React from 'react';
import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted style={{color: "white", background: "#1b1c1d"}}>
                    <Image size='massive' src='/assets/logo.png' alt='Logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome'></Header>
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
            </Container>
        </Segment>
    )
})

import React from "react";
import {useStore} from "../../app/stores/store";
import {Container, Header, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";

export default observer (function ServerError(){
    const {commonsStore} = useStore();

    return(
        <Container>
            <Header as='h1' content='Server Error'/>
            <Header as='h5' colr='red' content={commonsStore.error?.message}/>
            {commonsStore.error?.details &&
                <Segment>
                    <Header as='h4' content='Stack Trace' color='teal'/>
                    <code style={{marginTop: '10px'}}>{commonsStore.error.details}</code>
                </Segment>
            }
        </Container>
    )
})

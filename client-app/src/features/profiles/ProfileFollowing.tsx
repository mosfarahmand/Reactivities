import React from 'react';
import {Card, Grid, Header, Tab} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import ProfileCard from "./ProfileCard";


export default observer(function ProfileFollowing() {
    const {profileStore} = useStore();
    const {profile, followings, loadingFollowing, activeTab} = profileStore;
    return (
        <Tab.Pane loading={loadingFollowing}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floate='left' icon='user' content={activeTab===3
                        ?`People Following ${profile?.displayName}`
                        :`People ${profile?.displayName} is Following`
                    }/>
                </Grid.Column>

                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})

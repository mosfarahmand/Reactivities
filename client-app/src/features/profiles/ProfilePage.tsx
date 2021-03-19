import React, {useEffect} from 'react';
import ProfileHeader from './ProfileHeader';
import {Grid} from 'semantic-ui-react';
import ProfileContent from "./ProfileContent";
import {observer} from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import {useStore} from '../../app/stores/store';
import LoadingComponent from '../../app/layout/loadingComponent';

export default observer(function ProfilePage() {
    const {username} = useParams<{ username: string }>();
    const {profileStore} = useStore();
    const {loadProfile, loadingProfile, profile, setActiveTab} = profileStore;

    useEffect(() => {
        loadProfile(username);
        return () =>{
            setActiveTab(0);
        }
    }, [loadProfile, username]);

    if (loadingProfile) return <LoadingComponent/>
    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                <>
                    <ProfileHeader profile={profile}/>
                    <ProfileContent profile={profile}/>
                </>
                }
            </Grid.Column>
        </Grid>
    )
})

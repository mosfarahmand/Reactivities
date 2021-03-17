import {observer} from 'mobx-react-lite';
import React from 'react'
import {Activity} from "../../../app/models/activity";
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {useHistory} from 'react-router-dom';
import {useCallback} from "react";


interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedHeader({activity}: Props) {
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push(`/manage/${activity.id}`), [history]);

    const header = (
        <img alt="Card" src={`/assets/categoryImages/${activity.category}.jpg`}/>
    );
    const footer = (
        <span>
             {activity.isHost ? (
                 <Button icon="pi pi-check" floated='right' onClick={handleOnClick}>
                     Manage Event
                 </Button>
             ) : activity.isGoing ? (
                 <Button className="p-button-danger">Cancel Attendance</Button>
             ) : (
                 <Button icon="pi pi-times">Join Activity</Button>
             )}
        </span>
    );
    return (
        <div>
            <Card title={activity.title} footer={footer} header={header}>
           </Card>
        </div>
    )
})

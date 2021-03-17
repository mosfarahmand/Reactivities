import React from "react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import {Tag} from 'primereact/tag';

export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {groupedActivity} = activityStore;

    return (
        <>
            {groupedActivity.map(([group, activities]) => (
                <React.Fragment key={group}>
                    <br/>
                    <Tag value={group} icon="pi pi-calendar" severity="success"></Tag>
                    <br/>
                    <br/>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity}/>
                    ))}
                </React.Fragment>
            ))}
        </>
    )
})

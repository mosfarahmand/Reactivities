import React, {useEffect} from "react";
import ActivityList from "./ActivityList";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/loadingComponent";
import ActivityFilters from "./ActivityFilters";


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <=1) loadActivities();
     }, [activityRegistry.size, loadActivities]);


    if (activityStore.loadingInitial) return <LoadingComponent content={'loading activities'}/>

    return (
        <div className="row">
            <div className="leftcolumn">
                <ActivityList/>
            </div>
            <div className="rightcolumn">
                <ActivityFilters/>
            </div>
        </div>

    )
})

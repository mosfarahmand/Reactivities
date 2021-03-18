import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react'
import {Activity} from '../../../app/models/activity';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {useHistory} from 'react-router-dom';
import {useStore} from '../../../app/stores/store';
import {Label} from 'semantic-ui-react';


interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedHeader({activity}: Props) {
    const {activityStore: {updateAttendance, loading, cancelActivityToggle}} = useStore();
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push(`/manage/${activity.id}`), [history]);

    const header = (
        <div>
            {activity.isCancelled &&
            <Label style={{position: 'absolute', zIndex: 1000, leaf: -14, top: 20}} ribbon color='red'
                   content='Cancelled'/>
            }
            <img alt="Card" src={`/assets/categoryImages/${activity.category}.jpg`}/>
        </div>
    );
    const footer = (
        <span>
             {activity.isHost ? (
                 <>
                     <Button icon="pi pi-check" floated='right'
                             className={activity.isCancelled ? 'p-button-success' : 'p-button-danger'}
                             onClick={cancelActivityToggle}
                             style={{width: '20%', marginRight: 5}}
                             loading={loading}
                     >
                         {activity.isCancelled ? "Re-Activate" : "Cancel Activity"}
                     </Button>

                     <Button
                         disabled={activity.isCancelled}
                         className="p-button-warning"
                         icon="pi pi-check" floated='right'
                         onClick={handleOnClick} style={{width: '20%'}}>
                         Manage Event
                     </Button>
                 </>
             ) : activity.isGoing ? (
                 <Button loading={loading}
                         className="p-button-danger" style={{width: '20%'}}
                         onClick={updateAttendance}>
                     Cancel Attendance
                 </Button>
             ) : (
                 <Button
                     disabled={activity.isCancelled}
                     loading={loading} icon="pi pi-times"
                     className="p-button-success" style={{width: '20%'}}
                     onClick={updateAttendance}
                 >Join Activity
                 </Button>
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

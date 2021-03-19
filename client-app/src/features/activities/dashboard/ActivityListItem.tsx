import {Activity} from '../../../app/models/activity';
import {format} from 'date-fns';
import ActivityListItemAttendee from './ActivityListItemAttendee';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button'
import {Icon, Label} from 'semantic-ui-react';
import {Chip} from 'primereact/chip';
import {Tag} from 'primereact/tag';
import {useHistory} from 'react-router-dom';
import {useCallback} from 'react';
import {Divider} from "primereact/divider";

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props) {
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push(`/activities/${activity.id}`), [history]);

    const footer =
        <div>
            Attendees
            <br/>
            <ActivityListItemAttendee attendees={activity.attendees!}/>
            <span>
                <Button label="View" icon="pi pi-info-circle"
                        style={{marginRight: 5, float: 'right'}}
                        onClick={handleOnClick}/>
            </span>
        </div>;


    return (
        <Card title={activity.title} subTitle={activity.venue} footer={footer} style={{marginTop: 8}}>
            {activity.isCancelled &&
            <Tag severity="danger" value='Cancelled' style={{textAlign: 'center', width: '100%', marginBottom: 3}}/>
            }
            <Icon name='calendar' style={{marginBottom: 20}}/> {format(activity.date!, 'dd-MM-yyyy h:mm aa')}
            <Divider  style={{marginTop: -10}}/>
            <div style={{marginBottom: 5}}>
                 <Chip label={'Hosted by ' + activity.host?.displayName} image={activity.host?.image || '/assets/user.png'}/>
            </div>
            <div style={{marginBottom: 5}}>
                <Label content={activity.description}/>
            </div>
            {activity.isGoing && !activity.isHost && (
                <Tag severity="warning" className="p-mr-2" value=" You are going to this activity"></Tag>
            )}
            {activity.isHost && (
                <Tag severity="info" className="p-mr-2" value=" You are hosting this activity"></Tag>
            )}
            <Divider style={{marginBottom: -20}}/>
        </Card>
    )
}

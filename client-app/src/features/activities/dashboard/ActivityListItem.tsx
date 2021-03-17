import {Activity} from "../../../app/models/activity";
import {format} from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import {Card} from 'primereact/card';
import {Button} from 'primereact/button'
import {Icon} from "semantic-ui-react";
import {Chip} from 'primereact/chip';
import {Tag} from 'primereact/tag';
import {useHistory} from 'react-router-dom';
import {useCallback} from "react";

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
        </div>
    ;

    console.log(activity.host?.username);
    return (

        <div className="row">
            <div className="leftcolumn">
                <Card title={activity.title} subTitle={activity.venue} footer={footer}>
                    <Icon name='calendar'/> {format(activity.date!, 'dd MM yyyy h:mm aa')}
                    <br/>
                    <br/>
                    Hosted By
                    <br/>
                    <Chip label={activity.host?.username} image="/assets/user.png"/>
                    <br/>
                    <br/>
                    {activity.description}
                    <br/>
                    <br/>
                    {activity.isGoing && !activity.isHost && (
                        <Tag severity="warning" className="p-mr-2" value=" You are going to this activity"></Tag>
                    )}

                </Card>
            </div>
        </div>

    )
}

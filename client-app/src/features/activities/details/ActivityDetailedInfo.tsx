import {observer} from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid} from 'semantic-ui-react'
import {Activity} from '../../../app/models/activity';
import {format} from "date-fns";

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedInfo({activity}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <i className="pi pi-info-circle" style={{fontSize: 20, color: "teal"}}></i>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{activity.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <i className="pi pi-calendar" style={{fontSize: 20, color: "teal"}}></i>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                          {format(activity.date!, 'dd MM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <i className="pi pi-map-marker" style={{fontSize: 20, color: "teal"}}></i>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{activity.venue}, {activity.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})

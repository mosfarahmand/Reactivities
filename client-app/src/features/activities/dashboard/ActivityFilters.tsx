import React from 'react';
import {Header, Menu} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import Calendar from "react-calendar"

export default observer(function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();

    return (
        <>
            <Menu vertical size='large' style={{width: '100%', marginTop: 68}}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item
                    content='All Activities'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item
                    content='I am going'
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                />
                <Menu.Item
                    content='I am hosting'
                    active={predicate.has('isHost')}
                    onClick={() => setPredicate('isHost', 'true')}
                />
            </Menu>
            <Header/>
            <Calendar className="customCalendar"
                      onChange={(date) => setPredicate('startDate', date as Date)}
            />
        </>
    )
})

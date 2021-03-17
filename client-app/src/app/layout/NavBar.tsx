import React from "react";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button'
import {useHistory} from 'react-router-dom';
import {useCallback} from "react";

export default observer(function NavBar() {
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push(`/createActivity`), [history]);

    const items = [
        {
            label: 'Activities',
            icon: 'pi pi-fw pi-briefcase',
            command: (e) => {
                history.push(`/activities`)
            }
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-fw pi-check-circle',
                    command: (e) => {
                        history.push(`/profile/${user?.username}`)
                    }
                }]
        }
    ];

    const {userStore: {user, logout}} = useStore();
    const start = <img alt="logo" src="/assets/logo.png"
                       height="40" className="p-mr-2"></img>;
    const end =
        <div>
            <Button label="New Activity" icon="pi pi-calendar-plus" style={{marginRight: 5}}
                    className="p-button-success" onClick={handleOnClick}/>
            <Button label="Logout" icon="pi pi-power-off" onClick={logout} className="p-button-secondary"/>
        </div>;

    return (
        <div>
            <Menubar model={items} start={start} end={end}/>
        </div>
    )
})

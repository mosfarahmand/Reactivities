import React, {useEffect, useState} from "react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {useParams, useHistory} from "react-router-dom";
import LoadingComponent from "../../../app/layout/loadingComponent";
import {v4 as uuid} from 'uuid';
import {Activity} from "../../../app/models/activity";
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Panel} from 'primereact/panel';
import {Calendar} from "primereact/calendar";
import { Fieldset } from 'primereact/fieldset';


import 'primeflex/primeflex.css';
import {Button} from "primereact/button";

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });


    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`)
            })
        } else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`)
            })
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading activity...'/>

    return (
        <div className="p-d-flex">
            <Fieldset legend="Activity Details">
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" type="text" name='title'/>
                    </div>

                    <div className="p-field p-col-12">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="Description" type="text" name='description'/>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="date">Date</label>
                        <Calendar id="date" name='date' showTime showSeconds></Calendar>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="city">City</label>
                        <InputText id="city" type="text" name='city'/>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="venue">Venue</label>
                        <InputText id="venue" type="text" name='venue'/>
                    </div>
                </div>
                <Button label="Save" icon="pi pi-save" style={{ float: 'right'}}
                        className="p-button-success" />
                <Button label="Cancel" icon="pi pi-times" style={{ marginRight: 5, float: 'right'}}
                        className="p-button-warning" />
            </Fieldset>
        </div>
        // <Segment clearing>
        //     <Header content='Activity Details' sub color='teal'/>
        //     <Formik validationSchema={validationSchema} enableReinitialize
        //             initialValues={activity}
        //             onSubmit={values => handleFormSubmit(values)}>
        //         {({handleSubmit, isValid, isSubmitting, dirty}) => (
        //             <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
        //                 <MyTextInput placeholder='Title' name='title'/>
        //                 <MyTextArea rows={3} placeholder='Description' name='description'/>
        //                 <MySelectInput options={CategoryOptions} placeholder='Category' name='category'/>
        //                 <MyDateInput
        //                     placeholderText='Date' name='date'
        //                     showTimeSelect
        //                     timeCaption='time'
        //                     dateFormat='MMMM d, yyyy h:mm aa'
        //                 />
        //                 <Header content='Location Details' sub color='teal'/>
        //                 <MyTextInput placeholder='City' name='city'/>
        //                 <MyTextInput placeholder='Venue' name='venue'/>
        //                 <Button
        //                     disabled={isSubmitting || !dirty || !isValid}
        //                     loading={loading} floated='right'
        //                     positive type='submit' content='Submit'/>
        //                 <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
        //             </Form>
        //         )}
        //     </Formik>
        // </Segment>
    )
})

import React, {useCallback, useEffect, useState} from "react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {useParams, useHistory} from "react-router-dom";
import LoadingComponent from "../../../app/layout/loadingComponent";
import {v4 as uuid} from 'uuid';
import {Activity} from "../../../app/models/activity";
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar";
import {Fieldset} from 'primereact/fieldset';
import 'primeflex/primeflex.css';
import {Button} from "primereact/button";
import MyTextInput from "../../../app/common/form/MyTextInput";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();

     const handleOnClick = useCallback(() => history.push('/activities'), [history]);

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

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

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
            <Formik validationSchema={validationSchema} enableReinitialize
                    initialValues={activity}
                    onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Fieldset legend="Activity Details">
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12">
                                    <label htmlFor="title">Title</label>
                                    <MyTextInput placeholder='Title' name='title'/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="description">Description</label>
                                    <InputTextarea id="Description" type="text" name='description'/>
                                </div>
                                <div className="p-field p-col-12 p-md-4">
                                    <label htmlFor="date">Date</label>
                                    <MyDateInput
                                        placeholderText='Date' name='date'
                                        showTimeSelect
                                        timeCaption='time'
                                        dateFormat='MMMM d, yyyy h:mm aa'
                                    />
                                </div>
                                <div className="p-field p-col-12 p-md-4">
                                    <label htmlFor="city">City</label>
                                    <MyTextInput placeholder='City' name='city'/>
                                </div>
                                <div className="p-field p-col-12 p-md-4">
                                    <label htmlFor="venue">Venue</label>
                                    <MyTextInput placeholder='Venue' name='venue'/>
                                </div>
                            </div>
                            <Button disabled={isSubmitting || !dirty || !isValid} label="Save" icon="pi pi-save"
                                    style={{float: 'right'}} loading={loading}
                                    className="p-button-success"/>
                            <Button label="Cancel" icon="pi pi-times" style={{marginRight: 5, float: 'right'}}
                                    className="p-button-warning" onClick={handleOnClick}/>
                        </Form>
                    </Fieldset>
                )}
            </Formik>
        </div>
    )
})

import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Message } from 'semantic-ui-react'
import *as Yup from "yup"
import React, { useEffect, useState } from 'react'
import JobadService from '../../services/jobadService';
import CityService from '../../services/cityService';
import JobPositionService from '../../services/jobPositionService';
import WorkTimeService from '../../services/workTimeService';

export default function JobPostingAdd() {

    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [typesOfWorking, setTypesOfWorking] = useState([])

    useEffect(() => {
        let cityService = new CityService();
        cityService.getAll().then((result) => setCities(result.data.data));
        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data));
        let typeOfWorkingService = new WorkTimeService();
        typeOfWorkingService.getAll().then(result => setTypesOfWorking(result.data.data));
    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            jobDescription: "",
            minSalary: "",
            maxSalary: "",
            openPositionCount: "",
            applicationDeadline: "",
            typeOfWorkingId: "",
            employerId: "",
            jobPositionId: "",
            cityId: "",
        },
        validationSchema:
            Yup.object({
                jobDescription: Yup.string().required("Açıklama bos bırakılamaz!"),
                minSalary: Yup.number().required("Minimum maaş bırakılamaz!"),
                maxSalary: Yup.number().required("Maximum maaş bırakılamaz!"),
                openPositionCount: Yup.number().required("Açık pozisyon sayısı boş bırakılamaz!"),
                applicationDeadline: Yup.date().required("Son başvuru tarihi bos bırakılamaz!"),
                typeOfWorkingId: Yup.number().required("Çalışma türü bos bırakılamaz!"),
                employerId: Yup.number().required("İşveren boş bırakılamaz!"),
                jobPositionId: Yup.string().required("İş pozisyonu boş bırakılamaz!"),
                cityId: Yup.number().required("Şehir boş bırakılamaz!"),
            }),
        onSubmit: values => {
            console.log(values)
            let jobPostingService = new JobadService();
            jobPostingService.add(values).then();
        }
    });

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Grid stackable>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>İş pozisyonu</label>
                            <select id="jobPositionId" name="jobPositionId" value={values.job_title_id} onChange={handleChange}>
                                <option value="">İş pozisyonu seçiniz</option>
                                {jobPositions.map(jobPosition => (
                                    <option value={jobPosition.id}>{jobPosition.position_name}</option>
                                ))}
                            </select>
                            {
                                errors.jobPositionId && touched.jobPositionId &&
                                <Message color='red'>{errors.jobPositionId}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Çalışma Türü</label>
                            <select id="typeOfWorkingId" name="typeOfWorkingId" value={values.time_id} onChange={handleChange}>
                                <option value="">Çalışma türü seçiniz</option>
                                {typesOfWorking.map(typeOfWorking => (
                                    <option value={typeOfWorking.id}>{typeOfWorking.time}</option>
                                ))}
                            </select>
                            {
                                errors.typeOfWorkingId && touched.typeOfWorkingId &&
                                <Message color='red'>{errors.typeOfWorkingId}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Şehir</label>
                            <select id="cityId" name="cityId" value={values.city_id} onChange={handleChange}>
                                <option value="">Şehir seçiniz</option>
                                {cities.map(city => (<option key={city.id} value={city.id} selected>{city.cityName}</option>))}
                            </select>
                            {
                                errors.cityId && touched.cityId &&
                                <Message color='red'>{errors.cityId}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Açık Pozisyon Sayısı</label>
                            <input name="openPositionCount" placeholder='Açık Pozisyon Sayısı' value={values.number_of_open_positions} onChange={handleChange} />
                            {
                                errors.openPositionCount && touched.openPositionCount &&
                                <Message color='red'>{errors.openPositionCount}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Son Başvuru Tarihi</label>
                            <input name="applicationDeadline" type="date" value={values.application_deadline} onChange={handleChange} />
                            {
                                errors.applicationDeadline && touched.applicationDeadline &&
                                <Message color='red'>{errors.applicationDeadline}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Minimum Maaş</label>
                            <input name="minSalary" placeholder='Minimum Maaş' value={values.min_salary} onChange={handleChange} />
                            {
                                errors.minSalary && touched.minSalary &&
                                <Message color='red'>{errors.minSalary}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Maksimum Maaş</label>
                            <input name="maxSalary" placeholder='Maksimum Maaş' value={values.max_salary} onChange={handleChange} />
                            {
                                errors.maxSalary && touched.maxSalary &&
                                <Message color='red'>{errors.maxSalary}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={14}>
                        <Form.Field>
                            <label>İşveren</label>
                            <input id="employerId" name="employerId" value={values.employer_id} onChange={handleChange} />
                            {
                                errors.employerId && touched.employerId &&
                                <Message color='red'>{errors.employerId}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={14}>
                        <Form.Field>
                            <label>Açıklama</label>
                            <textarea name="jobDescription" placeholder='Açıklama' value={values.job_description} onChange={handleChange} />
                            {
                                errors.jobDescription && touched.jobDescription &&
                                <Message color='red'>{errors.jobDescription}</Message>
                            }
                        </Form.Field>
                    </GridColumn>
                </Grid>
                <Button type='submit'>İlan Ver</Button>
            </Form>
        </div>
    )
}
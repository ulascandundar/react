import { useFormik } from 'formik';
import { Button, Form, Message } from 'semantic-ui-react'
import React, { useState,useEffect } from 'react'
import CityService from '../../services/cityService';
import JobPositionService from '../../services/jobPositionService';
import *as Yup from "yup"
import JobadService from "../../services/jobadService";

export default function JobadAdd() {
    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])

    useEffect(() => {
        let cityService=new CityService();
        cityService.getCities().then((result)=>setCities(result.data.data));
        let jobPositionService= new JobPositionService()
        jobPositionService.getJobPositions().then((result)=>setJobPositions(result.data.data))
    }, []);

     const { values, errors, handleChange, handleSubmit, touched } = useFormik({

        initialValues:{
            jobDescription:"",
            minSalary:"",
            maxSalary:"",
            numberOfOpenPositions:"",
            applicationDeadline:"",
            postedDate:"",
            employer_id:"",
            job_title_id:"",
            city_id:""
        },
        validationSchema:
            Yup.object(
                {
                    jobDescription:Yup.string().required("Açıklama kısmı boş bırakılamaz"),
                    minSalary:Yup.number().required("minumum maaş boş bırakılamaz"),
                    maxSalary:Yup.number().required("maksimum maaş boş bırakılamaz"),
                    numberOfOpenPositions:Yup.number().required("boş bırakılamaz"),
                    applicationDeadline:Yup.date().required("Son başvuru tarihi bos bırakılamaz"),
                    job_title_id:Yup.number().required("İş türü boş bırakılamaz"),
                    city_id:Yup.number().required("şehir boş bırakılamaz"),
                }
            ),
            onSubmit: values=>{
                let jobadService=new JobadService()
                console.log(values)
                jobadService.add(values);
            }
    }
    )

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                <label>Açıklama</label>
                    <textarea name="jobDescription" placeholder='Açıklama' value={values.jobDescription} onChange={handleChange} />
                    {
                        errors.jobDescription && touched.jobDescription &&
                        <Message color='red'>{errors.jobDescription}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Minimum Maaş</label>
                    <input name="minSalary" placeholder='Minimum Maaş' value={values.minSalary} onChange={handleChange} />
                    {
                        errors.minSalary && touched.minSalary &&
                        <Message color='red'>{errors.minSalary}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Minimum Maaş</label>
                    <input name="maxSalary" placeholder='maksimum Maaş' value={values.maxSalary} onChange={handleChange} />
                    {
                        errors.maxSalary && touched.maxSalary &&
                        <Message color='red'>{errors.maxSalary}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Kontejyan</label>
                    <input name="numberOfOpenPositions" placeholder='Kontejyan' value={values.numberOfOpenPositions} onChange={handleChange} />
                    {
                        errors.numberOfOpenPositions && touched.numberOfOpenPositions &&
                        <Message color='red'>{errors.numberOfOpenPositions}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Son Başvuru Tarihi</label>
                    <input name="applicationDeadline" type="date" value={values.applicationDeadline} onChange={handleChange} />
                    {
                        errors.applicationDeadline && touched.applicationDeadline &&
                        <Message color='red'>{errors.applicationDeadline}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Çalışma Türü</label>
                    <select id="job_title_id" name="job_title_id" value={values.job_title_id} onChange={handleChange}>
                        <option value="">Çalışma türü seçiniz</option>
                        {jobPositions.map(jobPositions => (
                            <option value={jobPositions.id}>{jobPositions.position_name}</option>
                        ))}
                    </select>
                    {
                        errors.typeOfWorkingId && touched.typeOfWorkingId &&
                        <Message color='red'>{errors.typeOfWorkingId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Şehir</label>
                    <select id="city_id" name="city_id" value={values.city_id} onChange={handleChange}>
                        <option value="">Şehir seçiniz</option>
                        {cities.map(city => (<option key={city.id} value={city.id} selected>{city.cityName}</option>))}
                    </select>
                    {
                        errors.city_id && touched.city_id &&
                        <Message color='red'>{errors.city_id}</Message>
                    }
                </Form.Field>
                <Button type='submit'>İlan Ver</Button>
            </Form>

        </div>
    )
}

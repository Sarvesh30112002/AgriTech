import React, { useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Messages } from 'primereact/messages';
import axios from 'axios';

export const DiseaseDetection = () => {

    const toast = useRef(null);
    const diseaseDisplayMessage = useRef();

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    const myUploader = (event) => {
        //event.files == files to upload

        diseaseDisplayMessage.current.clear();

        var formData = new FormData();
        
        formData.append("imageFile", event.files[0]);
        axios.post('http://localhost:3001/disease', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data);
            let diseaseArr = res.data.disease.split(':');
            let diseaseLink = diseaseArr[1] + ':' + diseaseArr[2];
            if(diseaseArr[1] == 'None') {
                diseaseDisplayMessage.current.show({ severity: 'success', summary: `Your ${diseaseArr[0]} crop is healthy with ${Number(res.data.confidence) * 100} % confidence`, life: 300000 });
            }
            else {
                diseaseDisplayMessage.current.show({ severity: 'error', summary: `We detected ${diseaseArr[0]} in your crop with ${Number(res.data.confidence) * 100} % confidence`, life: 300000 });
                diseaseDisplayMessage.current.show({ severity: 'info', content: (
                    <React.Fragment>
                        <h5>Please visit <a className='p-text-bold' target='_blank' rel='noopener noreferrer' href={diseaseLink}>{diseaseLink}</a> to learn more about this disease and how to prevent it</h5>
                    </React.Fragment>
                ), life: 300000 });
            }
        });
    }

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Disease Prediction</h4>
                    <div className="pt-3"><h5>Please upload a picture of your crop from the top</h5></div>
                    <FileUpload name="imageFile" onUpload={onUpload} customUpload uploadHandler={myUploader} accept="image/*" maxFileSize={10000000} />

                    <Messages ref={diseaseDisplayMessage} />
                </div>
            </div>
        </div>
    )
}

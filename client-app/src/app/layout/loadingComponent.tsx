import React from "react";
import {ProgressSpinner} from 'primereact/progressspinner';

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({inverted = true, content = 'loading...'}: Props) {
    return (
        <div className='centered'>
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE"/>
        </div>
    )
}

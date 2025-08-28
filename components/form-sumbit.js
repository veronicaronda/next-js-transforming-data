"use client";
import { useFormState } from "react-dom"

export default function FormSubmit(){
    const formState = useFormState()

    if (formState.pending){
        return <p>
            Sending data...
        </p>
    }
    return(
        <>
            <button type="reset">Reset</button>
            <button>Create Post</button>
        </>
    )
}
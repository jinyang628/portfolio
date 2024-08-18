"use client";

import Typewriter from 'typewriter-effect'; 

export default function Title() {

    const INTRO_TEXT: string = "Hello! I am Jin Yang"

    return (
        <Typewriter 
            onInit={(typewriter) => { 
                typewriter.typeString(INTRO_TEXT).start(); 
            }} 
            options={{
                wrapperClassName: 'text-5xl flex justify-center mt-4',
                cursor: '',
            }}        
        />
    );
}
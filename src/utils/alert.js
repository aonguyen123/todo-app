import React from 'react';
import { AlertList, AlertContainer } from "react-bs-notifier";

export default function showAlert(onDismiss ,alert, timeout, position){
    return (
        <AlertContainer>
         
            <AlertList onDismiss={() => onDismiss()} timeout={timeout} position={position} alerts={alert} />
         
        </AlertContainer>
    )
}
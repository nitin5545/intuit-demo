import { IonCol, IonRow } from "@ionic/react";
import { EventData } from "../interface/types";
import Event from "./Event";

interface DisplayEventsProps{ 
    events: EventData[]
    onClick: (id: number) => void
    onFilter : (event : EventData) => boolean}
const DisplayEvents = ({ events, onClick, onFilter }: DisplayEventsProps) => {
    return (
        <IonRow>
            {events.filter((event) => onFilter(event)).map((event: EventData) => {
                return (
                    <IonCol key={event.id} sizeMd="6" sizeXs="12">
                        <Event eventData={event} onClick={onClick}/>
                    </IonCol>
                )
            })}
        </IonRow>
    )
}

export default DisplayEvents;
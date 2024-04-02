import { useEffect, useState } from "react";
import { EventData, EventViewerProps } from "../interface/types";
import { fetchEvents } from "../api/events";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import DisplayEvents from "./DisplayEvents";
import EventHeader from "./EventHeader";

const EventViewer = (props: EventViewerProps) => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<EventData[]>([]);
    useEffect(() => {
        setEvents(fetchEvents())
    }, [])

    const onSelect = (id : number) => {
        const sEvents = events.filter(event => event.id === id)
        sEvents.forEach(sEvent => sEvent.isSelected = true)
        setSelectedEvents([...selectedEvents, ...sEvents])
        const updatedEvents = updateConflictingEvents(sEvents[0], false)
        setEvents(updatedEvents)
    }

    const updateConflictingEvents = (event : EventData, isSelectable : boolean) => {
        let start_time = new Date(event.start_time).getTime();
        let end_time = new Date(event.end_time).getTime();
        return events.map((event) => {
            let current_start_time = new Date(event.start_time).getTime();
            let current_end_time = new Date(event.end_time).getTime();
            if(!event.isSelected && ((current_end_time >= start_time && current_end_time <= end_time) || (current_start_time >= start_time && current_end_time <= start_time))){
                event.isSelectable = isSelectable
            }
            return event
        })
    }

    const onDeselect = (id : number) => {
        const unSelectedEvents = selectedEvents.filter(event => event.id === id)
        unSelectedEvents.forEach(sEvent => sEvent.isSelected = false)
        setSelectedEvents(selectedEvents.filter(event => event.id !== id))
        const updatedEvents = updateConflictingEvents(unSelectedEvents[0], true)
        setEvents(updatedEvents)
    }
    return (
        <IonGrid>
            <IonRow>
                <IonCol className="event-containers">
                    <EventHeader title="All Events" />
                    {events.length > 0 ? <DisplayEvents events={events} onClick={onSelect} onFilter={(event) => !event.isSelected}/> : 
                    <IonRow className="no-events">No events to display</IonRow>}
                </IonCol>
                <IonCol className="event-containers">
                    <EventHeader title="Selected Events" />
                    {selectedEvents.length > 0 ? <DisplayEvents events={selectedEvents} onClick={onDeselect} onFilter={() => true}/> : 
                    <IonRow className="no-events">No selected events</IonRow>}
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default EventViewer;
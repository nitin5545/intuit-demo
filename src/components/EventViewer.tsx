import { useEffect, useState } from "react";
import { EventData, EventViewerProps } from "../interface/types";
import { fetchEvents } from "../api/events";
import DisplayEvents from "./DisplayEvents";
import EventHeader from "./EventHeader";
import { Container, Row, Col } from "react-bootstrap";

const EventViewer = (props: EventViewerProps) => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedEvents, setSelectedEvents] = useState<EventData[]>([]);
    useEffect(() => {
        fetchEvents()
        .then(data => {
            setEvents(data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [])

    const onSelect = (id : number) => {
        const sEvents = events.filter(event => event.id === id)
        sEvents.forEach(sEvent => sEvent.isSelected = true)
        const currentSelectedEvents = [...selectedEvents, ...sEvents]
        setSelectedEvents(currentSelectedEvents)
        let updatedEvents: EventData[] = []
        if(currentSelectedEvents.length < props.selectableEventCount){
            updatedEvents = updateConflictingEvents(sEvents[0], false)
        } else {
            updatedEvents = events.map(event => {
                if(!event.isSelected && event.isSelectable !== false) {
                    event.disabled = true
                }
                return event;
            })
        }
        setEvents(updatedEvents)
    }

    const updateConflictingEvents = (event : EventData, isSelectable : boolean) => {
        let start_time = new Date(event.start_time).getTime();
        let end_time = new Date(event.end_time).getTime();
        return events.map((event) => {
            let current_start_time = new Date(event.start_time).getTime();
            let current_end_time = new Date(event.end_time).getTime();
            if(!event.isSelected && isOverlappingIntervals(current_start_time, current_end_time, start_time, end_time)){
                event.isSelectable = isSelectable
            }
            return event
        })
    }

    const isOverlappingIntervals = (eventStart : number, eventEnd : number, startTime : number, endTime : number) => {
        return (startTime >= eventStart && startTime < eventEnd) 
            || (endTime > eventStart && endTime <= eventEnd) 
            || (eventStart >= startTime && eventEnd <= endTime)
    }

    const onDeselect = (id : number) => {
        const unSelectedEvents = selectedEvents.filter(event => event.id === id)
        unSelectedEvents.forEach(sEvent => sEvent.isSelected = false)
        setSelectedEvents(selectedEvents.filter(event => event.id !== id))
        const updatedEvents = updateConflictingEvents(unSelectedEvents[0], true)
        updatedEvents.filter(event => event.disabled === true).forEach(event => event.disabled = false)
        setEvents(updatedEvents)
    }
    return (
        <Container className="mt-10">
            {loading ? "Loading....." :
                <Row>
                    <Col className="event-containers">
                        <EventHeader title="All Events" />
                        {events.length > 0 ? <DisplayEvents events={events} onClick={onSelect} onFilter={(event) => !event.isSelected} /> :
                            <Row className="no-events">No events to display</Row>}
                    </Col>
                    <Col className="event-containers">
                        <EventHeader title="Selected Events" />
                        {selectedEvents.length > 0 ? <DisplayEvents events={selectedEvents} onClick={onDeselect} onFilter={() => true} /> :
                            <Row className="no-events">No selected events</Row>}
                    </Col>
                </Row>}
        </Container>
    )
}

export default EventViewer;
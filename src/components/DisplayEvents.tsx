import { Row, Col } from "react-bootstrap";
import { EventData } from "../interface/types";
import Event from "./Event";

interface DisplayEventsProps{ 
    events: EventData[]
    onClick: (id: number) => void
    onFilter : (event : EventData) => boolean}
const DisplayEvents = ({ events, onClick, onFilter }: DisplayEventsProps) => {
    return (
        <Row className="events-row">
            {events.filter((event) => onFilter(event)).map((event: EventData) => {
                return (
                    <Col key={event.id} md={5} xs={12} className="mb-10">
                        <Event eventData={event} onClick={onClick}/>
                    </Col>
                )
            })}
        </Row>
    )
}

export default DisplayEvents;
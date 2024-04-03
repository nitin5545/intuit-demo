import { Container, Row, Col } from "react-bootstrap";
import { EventProps } from "../interface/types";

const Event = (props : EventProps) => {
    const eventData = props.eventData;
    const startTime = new Date(eventData.start_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const endTime = new Date(eventData.end_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const isEnabled = eventData.isSelectable !== false && eventData.disabled !== true
    return (
        <Container className={`${isEnabled ? "enabled-event" : "disabled-event"} event-container`} data-testid="event-container">
            <Row>
                <Col md={3} className="event-category" data-testid="event-category">
                    {eventData.event_category.charAt(0).toUpperCase()}
                </Col>
                <Col>
                    <Row className="font-weight-800" data-testid = "event-name">{eventData.event_name}</Row>
                    <Row className="fs-14" data-testid="category-name" >({eventData.event_category})</Row>
                    <Row className="fs-12" data-testid="timing" >{startTime} - {endTime}</Row>
                    <Row className="button-container">
                        <Col className="button-col">
                            <button data-testid="select-button" className={`${isEnabled ? eventData.isSelected ? "selected-button" : "selectable-button" : ""} button`} disabled={!isEnabled} onClick={() => props.onClick(eventData.id)}>
                                {eventData.isSelected ? "Remove" : "Select"}
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Event;
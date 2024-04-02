import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { EventProps } from "../interface/types";

const Event = (props : EventProps) => {
    const eventData = props.eventData;
    const startTime = new Date(eventData.start_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const endTime = new Date(eventData.end_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return (
        <IonGrid className={`${(eventData.isSelectable !== false) ? "enabled-event" : "disabled-event"} event-grid`}>
            <IonRow>
                <IonCol size="3" className="event-category">
                    <IonText data-testid = "event-category">{eventData.event_category.charAt(0).toUpperCase()}</IonText>
                </IonCol>
                <IonCol>
                    <IonRow className="font-weight-800" data-testid = "event-name">{eventData.event_name}</IonRow>
                    <IonRow className="fs-14" data-testid="category-name" >({eventData.event_category})</IonRow>
                    <IonRow className="fs-12" data-testid="timing" >{startTime} - {endTime}</IonRow>
                    {<IonRow className="button-container">
                        <button data-testid="select-button" className={`${(eventData.isSelectable !== false ) ? eventData.isSelected ? "selected-button" : "selectable-button" : ""} button`} disabled={eventData.isSelectable  === false} onClick={() => props.onClick(eventData.id)}>
                            {eventData.isSelected ? "Remove" : "Select"}
                        </button>
                    </IonRow>}
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Event;
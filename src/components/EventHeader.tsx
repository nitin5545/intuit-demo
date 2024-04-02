import { IonRow } from "@ionic/react"
import { EventHeaderProps } from "../interface/types"

const EventHeader = ({title} : EventHeaderProps) => {
    return (
        <IonRow className="container-header">
            {title}
        </IonRow>
    )
}

export default EventHeader;
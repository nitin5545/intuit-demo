import { Row } from "react-bootstrap";
import { EventHeaderProps } from "../interface/types"

const EventHeader = ({title} : EventHeaderProps) => {
    return (
        <Row className="container-header mb-10">
            {title}
        </Row>
    )
}

export default EventHeader;
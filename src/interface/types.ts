export interface EventData {
    id: number
    event_name: string
    event_category : string
    start_time : string
    end_time : string
    isSelected? : boolean
    isSelectable? : boolean
}

export interface EventViewerProps {
    selectableEventCount : number
}

export interface EventProps {
    eventData : EventData
    onClick: (id: number) => void 
}

export interface EventHeaderProps {
    title : String
}
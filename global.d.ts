import { Event, type Relay, } from "nostr-tools"

export interface Tooltip {
    type: TooltipType
    name: string
    message?: string
    duration?: number
}

export type Relays = { [key: string]: Relay }

export type NavTree = {
    name: string
    link: string
    icon: React.ReactElement
}

export type TextNote = Event & {
    reply_id?: string;
    replies?: Array<Note>;
    reactions?: Array<Reaction>;
    upvotes?: number;
    downvotes?: number;
    relays?: Array<string>;
    user?: User;
    tree?: number;
    dirty?: boolean;
}

type TooltipType = 'default' | 'warning' | 'error'
export type buttonVariant = "primary" | "secondary" | "link"
export type buttonSize =  "small" | "medium" | "large"
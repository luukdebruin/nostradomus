interface Tooltip {
    type: TooltipType
    name: string
    message?: string
    duration?: number
}

interface Relay {
    id: string
    address: string
    active: boolean
}

type Relays = Relay[]

type NavTree = {
    name: string
    link: string
    icon: React.ReactElement
}

type TooltipType = 'default' | 'warning' | 'error'
type buttonVariant = "primary" | "secondary" | "link"
type buttonSize =  "small" | "medium" | "large"
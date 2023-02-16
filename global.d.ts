interface AppError extends Error {
    type: ErrorType
    duration?: number
}

type NavTree = {
    name: string
    link: string
    icon: React.ReactElement
}

type ErrorType = 'default' | 'warning' | 'error'
type buttonVariant = "primary" | "secondary" | "link"
type buttonSize =  "small" | "medium" | "large"
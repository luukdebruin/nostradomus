import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: buttonSize
	variant?: buttonVariant
	children: React.ReactNode
	onClick?: () => void
}

const sizeClass = {
	small: 'px-3 py-2 text-sm rounded-sm',
	medium: 'px-4 py-2 text-base rounded-md',
	large: 'px-5 py-3 text-large rounded-lg',
}

const variantClass = {
	primary: 'bg-slate-400',
	secondary: 'bg-slate-300',
	link: '',
}

const Button = ({ size = 'medium', variant = 'primary', children, className, onClick }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'whitespace-nowrap',
				'hover:opacity-75 duration-200 ease-in-out',
				className,
				sizeClass[size],
				variantClass[variant]
			)}
		>
			{children}
		</button>
	)
}

export default Button

function Button({
    children,
    type = 'button',
    bgCollor = 'bg-blue-600',
    textCollor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-lg ${type} ${bgCollor} ${textCollor} ${className}`}
            {...props}>
            {children}
        </button>
    )
}

export default Button
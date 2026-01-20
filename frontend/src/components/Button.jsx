import { theme } from "./styles/theme";

function Button({
    children, // текст внутри кнопки
    onClick, // функция при клике
    type = 'button', // тип кнопки (button, submit, reset)
    variant = 'primary', // вариант стиля
    disabled = false, // заблокирована ли кнопка
    className = '' // дополнительные css классы 
}) {
    // функция возвращает стили в зависимости от variant
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                };
            case 'danger':
                return {
                    backgroundColor: theme.colors.error,
                    color: 'white',
                };
            case 'secondary':
                return {
                    backgroundColor: theme.colors.border,
                    color: theme.colors.text,
                };
            default:
                return {
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                };
        }
    };

    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button ${className}`}
            style={{
                ...getVariantStyles(), // распаковываем стили variant
                border: 'none',
                borderRadius: theme.borderRadius,
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                fontSize: '14px',
                fontWeight: '500',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                transition: 'all 0.2s ease', // плавная анимация
            }}
            onMouseEnter={(e) => {
                // при наведение мыши
                if (!disabled) {
                    e.target.style.opacity = '0.9';
                    e.target.style.transform = 'translateY(-1px)';
                }
            }}
            onMouseLeave={(e) => {
                // когда мышь убрали
                if (!disabled) {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                }
            }}
        >
            {children}
        </button>
    );
}

export default Button;
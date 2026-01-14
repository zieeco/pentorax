import React from 'react';
interface ErrorMessageProps {
    message?: string;
    retry?: () => void;
}
declare const ErrorMessage: React.FC<ErrorMessageProps>;
export default ErrorMessage;

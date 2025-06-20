const ErrorLog = (error: ErrorLogProps) => {
  console.log('logging error');
  console.log(error.error);
};

export default ErrorLog;



interface ErrorLogProps {
  error: {
    user_email: string;
    error_service: string;
    error_method: string;
    error_message: string;
    error_description?: string;
  }
}
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { useState } from 'react';

enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  MESSAGE = 'msg',
}

interface ToastOptions {
  type: ToastType;
  message: string;
  title: string;
  onClose?: () => {};
}

export const Toast = {
  type: ToastType,
  show({ title, message, type = ToastType.MESSAGE }: ToastOptions) {
    const container = document.getElementById('toast-holder');
    if (container) {
      const toast = getToastHtml({ title, message, type });
      ReactDOM.render(toast, container);
    } else {
      alert(`${type} ${title}: ${message}`);
    }
  },
};

const getToastHtml = ({ title, message, type }: ToastOptions) => {
  return (
    <ToastSimpleMessage message={message} />
  );
};

const ToastSimpleMessage = ({ message }: any) => {
  const [open, setOpen] = useState(true);
  return (
    <Snackbar
      open={open}
      message={message}
      action="Close"
      onClose={() => {
        setOpen(false);
      }}
      autoHideDuration={4000}
    />
  );
};

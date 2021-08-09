import ReactDOM from 'react-dom';

interface AlertOptions {
  type: string;
  message: string;
  title: string;
}

export const Alert = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
  show({ title, message, type }: AlertOptions) {
    const container = document.getElementById('alert-holder');
    if (container) {
    } else {
      alert(`${type} ${title}: ${message}`);
    }
  },
  hide() {
    // $('.alert').alert('close');
  },
  render() {
    return <div id="alert-holder"></div>;
  },
};

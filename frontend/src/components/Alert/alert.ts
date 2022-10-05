const alertModal = (value: string, message: string): void => {
  if (!value || value.length === 0) {
    return window.alert(message);
  }
};

export default alertModal;

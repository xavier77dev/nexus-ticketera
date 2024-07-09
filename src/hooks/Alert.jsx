const Alert = ({ alert }) => {
  const { msg, error } = alert;

  return (
    <p 
      className={`${error ? "bg-red" : "bg-celeste"} mb-2 px-2 py-1 rounded-sm text-white  w-full text-center`}
      style={{ borderRadius: '5px' }}
    >
      {msg}
    </p>
  );
}

export default Alert;


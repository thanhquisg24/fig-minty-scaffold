import { toast } from "react-toastify";

export const emitToastError = (errMsg: string | JSX.Element): void => {
  toast.error(errMsg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};
export const emitToastSuccess = (sucMessage: string | JSX.Element): void => {
  toast.success(sucMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};
export const emitToastDefault = (message: string | JSX.Element): void => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    type: toast.TYPE.DEFAULT,
  });
};

export function notify({
  message,
  description,
  txid,
  type = "info",
}: {
  message: string;
  description?: string | JSX.Element;
  txid?: string;
  type?: string;
}): void {
  if (txid) {
    // eslint-disable-next-line no-param-reassign
    description = (
      <>
        <br />
        <a target="_blank" href={`https://solscan.io/tx/${txid}`} style={{ color: "#0000ff" }} rel="noreferrer">
          View transaction {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
        </a>
      </>
    );
  }
  if (type === "success") {
    emitToastSuccess(message);
  } else if (type === "error") {
    emitToastError(message);
  } else {
    emitToastDefault(message);
  }
  // notification[type]({
  //   message: <span style={{ color: "black" }}>{message}</span>,
  //   description: <span style={{ color: "black", opacity: 0.5 }}>{description}</span>,
  //   placement,
  //   style: {
  //     backgroundColor: "white",
  //   },
  // });
}

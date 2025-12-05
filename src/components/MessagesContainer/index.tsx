import { Bounce, ToastContainer } from "react-toastify";

type MessagesContainerType = {
  children: React.ReactNode;
};

export function MessagesContainer({ children }: MessagesContainerType) {
  return (
    <>
      {children}

      <ToastContainer
        position='top-center'
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
}

import TailSpinLoading from "../components/Loading/TailSpinLoading";
import Logo from "../components/Logo/Logo";

export default function Auth({ isLoading, handleSubmit, children }) {
  return (
    <>
      {isLoading && <TailSpinLoading />}
      <div className="full-screen screen-center white-bg">
        <form className="flex-column" style={{ width: "300px" }} onSubmit={handleSubmit}>
          <Logo isHeader={false} />
          {children}
        </form>
      </div>
    </>
  );
}

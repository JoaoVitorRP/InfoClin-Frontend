import Header from "../components/Header/Header";
import TailSpinLoading from "../components/Loading/TailSpinLoading";

export default function Main({ title, isLoading, children }) {
  return (
    <>
      <Header />
      {isLoading && <TailSpinLoading />}
      <main className="flex-column">
        <h1 className="blue-txt">{title}</h1>
        <hr className="title-hr blue-bg" />
        {children}
      </main>
    </>
  );
}

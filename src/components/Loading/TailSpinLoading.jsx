import { TailSpin } from "react-loader-spinner";

import "./Loading.css";

export default function TailSpinLoading() {
  return (
    <div className="loading-bg">
      <TailSpin visible={true} height="100" width="100" color="#4ab5a4" ariaLabel="tail-spin-loading" radius="2" />
    </div>
  );
}

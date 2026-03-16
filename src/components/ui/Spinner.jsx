import { useSelector } from "react-redux";
import styles from "./Spinner.scss";

const Spinner = ({ showGlobal = false, className }) => {
  const showSpinner = useSelector(
    (state) => state.spinnerSlice.showSpinner
  );

  if (!showSpinner) return null;

  return (
    <div
      className={`${showGlobal
          ? styles.spinnerContainer
          : styles.moduleSpinnerContainer
        } ${className}`}
    >
      <div className={styles.loader}></div>
    </div>
  );
};


export default Spinner;

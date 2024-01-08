import Header from "../components/Header";
import Service from "../components/Service";
import { TotalBudget } from "../components/TotalBudget.js";
import NewBudget from "../components/NewBudget.js";
import { useParams } from "react-router-dom";

import HelpPopUp from "../components/HelpPopUp";
import {
  useServicesContext,
  useModalContext,
} from "../components/NewProvider.js";
import { ToggleSwitch } from "../components/ToggleSwitch.js";
export default function MainPage() {
  const { info } = useParams();

  const { newServices } = useServicesContext();
  const { show } = useModalContext();

  return (
    <div className="container">
      <Header />
      <div className="annual_toggle">
        <span>Pagament mensual</span> <ToggleSwitch />{" "}
        <span>Pagament anual</span>
      </div>

      <Service />
      {show ? (
          <HelpPopUp />
      ) : null}
      <div className="toggle_wrapper"></div>

      <TotalBudget />

      <NewBudget />
    </div>
  );
}

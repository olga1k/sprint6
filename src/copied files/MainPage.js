import Header from "../components/Header";
import Service from "../components/Service";
import { TotalBudget } from "../components/TotalBudget.js";
//import Budget from "../components/Budget";
import NewBudget from "../components/NewBudget.js";
import NewProvider from "../components/NewProvider.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//import Extra from "./Extra";
import HelpPopUp from "../components/HelpPopUp";
import { FaQuestionCircle } from "react-icons/fa";
//import Offer from "../components/Offer.js";
import { useServicesContext, useBudgetContext, useAddPagesLanguagesContext, useModalContext, useAnnualContext } from "../components/NewProvider.js";
import { ToggleSwitch } from "../components/ToggleSwitch.js";
export default function MainPage() {
  const {decreaseLanguages, decreasePages, pagesLanguages, increaseLanguages, increasePages} = useAddPagesLanguagesContext();

  const { info } = useParams();

  const languages = 0;
  const pages = 0;
  const { services, setServices, calcBudget, newServices, currentServices, setCurrentServices } = useServicesContext();
  const { budget, setBudget, servicesPicked, setServicesPicked } = useBudgetContext();
  const {show} = useModalContext();
  const { annual, annualOrMonthly } = useAnnualContext();
  

  //COUNT PAGES AND LANGUAGES START
  /*function pagesLanguages(e, id) {
    const { name, value } = e.target;
    setServices((prevServices) => {
      return prevServices.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            [name]: value,
          };
        }
        return service;
      });
    });
  }

  function increaseLanguages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            serviceLanguages: service.serviceLanguages + 1,
          };
        }
        return service;
      });
    });
  }

  function decreaseLanguages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            serviceLanguages:
              service.serviceLanguages === 0 ? 0 : service.serviceLanguages - 1,
          };
        }
        return service;
      });
    });
  }
  function increasePages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            servicePages: service.servicePages + 1,
          };
        }
        return service;
      });
    });
  }
  function decreasePages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            servicePages:
              service.servicePages === 0 ? 0 : service.servicePages - 1,
          };
        }
        return service;
      });
    });
  }
  */
//COUNT PAGES AND LANGUAGES END
 // const [currentServices, setCurrentServices] = useState([]);
  console.log(services);
  //CHECK THE SERVICE START

  /*function handleChange(id, isChecked) { //in NewProvider renamed to handleChecked
    setServices((prevServices) => {
      return prevServices.map((service) => {
        if (service.id === id)
          return {
            ...service,
            isChecked,
          };

        return service;
      });
    });

    calcBudget();
    //console.log("currentServices", currentServices);
  }

  */
   //CHECK THE SERVICE END
/* EXTRA //moved to Extra
  const Extra = ({ id }) => (
    <div className="extra">
      <div>
        <FaQuestionCircle onClick={() => toggleModal("togglePages")} />
        Nombre de pàgines
        <button
          className="btn_minus"
          id={crypto.randomUUID()}
          onClick={(e) => decreasePages(e, id)}
        >
          -
        </button>
        <input
          type="number"
          name="servicePages"
          value={
            services.find((service) => service.id === id)?.servicePages || ""
          }
          className="num"
          onChange={(e) => pagesLanguages(e, id)}
          placeholder={pages}
        />
        <button
          className="btn_plus"
          id={crypto.randomUUID()}
          onClick={(e) => increasePages(e, id)}
        >
          +
        </button>
      </div>

      <div>
        <FaQuestionCircle onClick={() => toggleModal("toggleLanguages")} />
        Nombre de llenguatges
        <button
          className="btn_minus"
          id={crypto.randomUUID()}
          onClick={(e) => decreaseLanguages(e, id)}
        >
          -
        </button>
        <input
          type="number"
          name="serviceLanguages"
          value={
            services.find((service) => service.id === id)?.serviceLanguages ||
            ""
          }
          className="num"
          onChange={(e) => pagesLanguages(e, id)}
          placeholder={languages}
        />
        <button
          className="btn_plus"
          id={crypto.randomUUID()}
          onClick={(e) => increaseLanguages(e, id)}
        >
          +
        </button>
      </div>
    </div>
  );
//EXTRA end
  //SERVICE
  /*
  const newServices = services.map((service, index) => {
    return (
      <div
        key={service.id}
        className={`service_card ${service.isChecked ? "height_color" : ""}`}
      >
        <div className="service">
          <div className="service_description">
            <h3>{service.serviceName}</h3>
            <p>{service.serviceDescription}</p>
          </div>
          <div className="price_offer">
            {annual && <Offer annual={annual} />}
            <h2 className="price">{service.price}</h2>
          </div>
          <div className="service_add">
            <label htmlFor={index}>Afegir</label>
            <input
              value="service.serviceName"
              type="checkbox"
              id={service.id}
              onChange={(e) => handleChange(service.id, e.target.checked)}
              checked={service.isChecked}
            />
          </div>
        </div>

        {service.isChecked && service.serviceName === "Web" && <Extra id={service.id} />}
      </div>
    );
  });

  */
  //moved here from Extra.js
  //MODAL //moved to NewProvider
  /*
  const [modalText, setModalText] = useState("");
  function toggleModal(text) {
    setShow((prevShow) => !prevShow);
    console.log("showModal fired", show);
    if (text === "toggleLanguages") {
      console.log("toggle lang");
      setModalText(
        <div>
          <h4>Número de llenguatges</h4>
          <p>Afegeix els llenguatges que tindrà el teu projecte.</p>
          <p>El cost de cada llenguatge és de 30€.</p>
        </div>
      );
    }

    if (text === "togglePages") {
      console.log("toggle pages");
      setModalText(
        <div>
          <h4>Número de pàgines</h4>
          <p>
            Afegeix les pàgines que necessitis per a dur a terme el teu
            projecte.
          </p>
          <p>El cost de cada pàgina és de 30€.</p>
        </div>
      );
    }
  }

  function handleClose() {
    setShow(false);
  }
  */
//MODAL end

  //from Budget.js
  //BUDGET START moved to NewProvider
  /*
  let [budget, setBudget] = useState(0); //change for const and fix the bugs

  useEffect(() => {
    calcBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, pages, languages, currentServices, annual]);

/* //copied to NewProvider
  function calcBudget() {
    let newBudget;
    setBudget((prevBudget) => {
      console.log(currentServices, "currentServices", currentServices.length);
      if (currentServices.length === 1) {
        newBudget =
          currentServices[0].price +
          (currentServices[0].servicePages +
            currentServices[0].serviceLanguages) *
            30;
        return annual ? newBudget - (newBudget / 100) * 20 : newBudget; //not working properly
      } else if (currentServices.length > 1) {
        newBudget =
          currentServices.reduce((a, b) => b.price + a, 0) +
          currentServices.reduce((a, b) => b.servicePages + a, 0) * 30 +
          currentServices.reduce((a, b) => b.serviceLanguages + a, 0) * 30;
        return annual ? newBudget - (newBudget / 100) * 20 : newBudget;
      } else {
        return 0;
      }
    });
  }
  
  */
 //BUDGET END
  //const [checked, setChecked] = useState(false);
//ANNUAL START
/*
  function annualOrMonthly() {
    console.log("annualOrMonthly fired");
  
    setChecked(prevChecked => !prevChecked)
setAnnual(prevAnnual => !prevAnnual)
    
    console.log("annual", annual, "checked", checked);
  }
  */
//ANNUAL END
  /*DOUBLE CHECK ANNUAL, NOT CORRECT USE, NOW ON CHANGE WE NEED TWO STATES */
//element 1.1  /*{show ? (
  //<div className="modal_container">
  //<HelpPopUp handleClose={handleClose} modalText={modalText} />
//</div>
//) : null}*/
//element 1.1 end
//moved to ToggleSwitch
/*
  const toggleSwitch = 
    <label className="toggle_label">
    <input type="checkbox" 
    checked={checked}
    onChange={annualOrMonthly}/>
        <span className="slider"></span>
    </label>
  */
  return (
    <div className="container">
      <Header />
      <div className="annual_toggle">
      <span>Pagament mensual</span> <ToggleSwitch/> <span>Pagament anual</span>
      </div>

      <Service />
      {show ? (
  <div className="modal_container">
  <HelpPopUp />
</div>
) : null}<div className="toggle_wrapper">


        </div>

        <div className="service_box">
          <div>{newServices}</div>
        </div>
<TotalBudget />
        

        <NewBudget
        />
    </div>
  );
}
/*<NewBudget
          budget={budget}
          annual={annual}
          annualOrMonthly={annualOrMonthly}
          currentServices={currentServices}
        />*/
import React, { useState, useEffect, useContext, createContext } from "react";
import servicesData from "../data/servicesData";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

//CONTEXTS
const servicesContext = createContext();
export function useServicesContext() {
  return useContext(servicesContext);
}

const budgetContext = createContext();
export function useBudgetContext() {
  return useContext(budgetContext);
}

//NewBudget
const userServiceContext = createContext();
export function useUserServiceContext() {
  return useContext(userServiceContext);
}

//add Pages and Languages
const addPagesLanguagesContext = createContext();
export function useAddPagesLanguagesContext() {
  return useContext(addPagesLanguagesContext);
}

//modal
const modalContext = createContext();
export function useModalContext() {
  return useContext(modalContext);
}

//annual
const annualContext = createContext();
export function useAnnualContext() {
  return useContext(annualContext);
}

//NEW PROVIDER
export default function NewProvider({ children }) {
  const [services, setServices] = useState(servicesData);

  //CHECK THE SERVICE START

  function handleChecked(id, isChecked) {
    setServices((prevServices) => {
      const updatedServices = prevServices.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            isChecked,
          };
        }
        return service;
      });
      calcBudget(updatedServices);
      return updatedServices;
    });
  }
  //CHECK THE SERVICE END

  const [currentServices, setCurrentServices] = useState([]);

  //BUDGET START
  let [budget, setBudget] = useState(0);
  let [servicesPicked, setServicesPicked] = useState([]);

  function calcBudget() {
    let newBudget;
    setBudget((prevBudget) => {
      console.log(currentServices, "currentServices", currentServices.length);
      if (currentServices.length >= 1) {
        newBudget =
          currentServices.reduce((a, b) => b.price + a, 0) +
          currentServices.reduce((a, b) => b.servicePages || 0 + a, 0) * 30 +
          currentServices.reduce((a, b) => b.serviceLanguages || 0 + a, 0) * 30;
        return annual ? newBudget - (newBudget / 100) * 20 : newBudget;
      } else {
        return 0;
      }
    });
  }
  //BUDGET END

  //NewBudget START

  const [userService, setUserService] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    userServices: [],
    userTotal: 0,
    userDate: [],
    userId: "",
  });
  const [allBudgets, setAllBudgets] = useState([]);
  const [search, setSearch] = useState("");

  const [initialOrder, setInitialOrder] = useState([]);

  function handleChange(e) {
    if (e && e.target) {
      //to avoid the error

      const dateJSON = new Date().toJSON().slice(0, 10);
      const date = dateJSON.split("-");

      const { name, value } = e.target;
      setUserService((prevUserService) => ({
        ...prevUserService,
        [name]: value,
        userDate: date,
      }));
    }
  }
  function submitNewBudget(e) {
    e.preventDefault();
    const newUserId = crypto.randomUUID();
    setAllBudgets((prevAllBudgets) => {
      return [
        ...prevAllBudgets,
        {
          ...userService,
          userTotal: budget,
          userServices: currentServices,
          userId: newUserId,
        },
      ];
    });

    setInitialOrder((prevInitialOrder) => {
      return [
        ...allBudgets,
        {
          ...userService,
          userTotal: budget,
          userServices: currentServices, //userId: newUserId
        },
      ];
    });
    return allBudgets;
  }

  const newBudget = (
    <div className="new_budget">
      <h2>Demanar pressupost</h2>
      <form className="budget_info">
        <div className="new_budget_info">
          <input
            type="text"
            name="userName"
            value={userService.userName}
            placeholder="Nom"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="userPhone"
            value={userService.userPhone}
            placeholder="Teléfon"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="userEmail"
            value={userService.userEmail}
            placeholder="Email"
            onChange={handleChange}
          ></input>
        </div>
        <button className="btn_budget" onClick={submitNewBudget}>
          Sol·licitar pressupost
          <FaArrowRight />
        </button>
      </form>
    </div>
  );

  //CREATE URL LINK
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();

  //code trial start
  const updateCurrentServicesFromURL = () => {
    // const urlSearchParams = new URLSearchParams(location.search);
    const urlSearchParams = new URLSearchParams("Web=true&pages=3");

    console.log("urlSearchParams", urlSearchParams.entries());
    let arrayFromUrl = [];
    for (const [serviceUrl, valueServiceUrl] of urlSearchParams.entries()) {
      arrayFromUrl.push({ serviceUrl, valueServiceUrl });

      console.log("arrayFromUrl", arrayFromUrl);
    }

    const updatedCurrentServices = services.map((service) => ({
      ...service,
      isChecked: arrayFromUrl.some(
        (url) =>
          url.serviceUrl === service.serviceName &&
          url.valueServiceUrl === "true"
      ),
    }));

    console.log("updatedCurrentServices", updatedCurrentServices);
    /*const updatedCurrentServices = services.map((service) => ({
      ...service,
      isChecked: urlSearchParams.get(service.serviceName) === "true",
      // ... (other properties)
    }));*/
    // setCurrentServices(updatedCurrentServices);
    // Update budget and other state variables as needed
    // calcBudget(updatedCurrentServices);
  };

  // Effect to update currentServices based on URL parameters
  useEffect(() => {
    updateCurrentServicesFromURL();
  }, [location.search, services]);

  //code trial end

  function getBudgetLink(e, id) {
    console.log("getBudgetLink fired");
    console.log(id);
    console.log(allBudgets);
    console.log("location", location.search);

    const budget = allBudgets.find((service) => service.userId === id);
    console.log("service", budget);

    if (budget) {
      const checkboxesLink = currentServices
        .map((service) =>
          service.isChecked ? `${service.serviceName}=true` : ""
        )
        .filter(Boolean)
        .join("&");

      const pagesLink = budget.userServices //created seperately to prevent commas from appearing in the link
        .filter((budget) => budget.serviceName === "Web" && budget.servicePages)
        .map((budget) => `&pages=${budget.servicePages}`)
        .join("");

      const langLink = budget.userServices
        .filter(
          (budget) => budget.serviceName === "Web" && budget.serviceLanguages
        )
        .map((budget) => `&lang=${budget.serviceLanguages}`)
        .join("");
      const budgetLink = `?${checkboxesLink}${pagesLink}${langLink}`;

      /*
const budgetLink = `?${checkboxesLink}${budget.userServices.map(budget => (budget.serviceName === "Web" && budget.servicePages) ? `&pages=${budget.servicePages}` : "")}${budget.userServices.map(budget => (budget.serviceName === "Web" && budget.serviceLanguages) ? `&lang=${budget.serviceLanguages}` : "")}`*/

      /* const budgetLink = `?${budget.userServices.map(budget => budget.serviceName ? `${budget.serviceName}=true` : "")}${budget.userServices.map(budget => (budget.serviceName === "Web" && budget.servicePages) ? `&pages=${budget.servicePages}` : "")}${budget.userServices.map(budget => (budget.serviceName === "Web" && budget.serviceLanguages) ? `&lang=${budget.serviceLanguages}` : "")}`
       */

      const newUrl = `${location.pathname}${budgetLink}`;
      window.history.pushState({}, "", newUrl);

      console.log("Budget Link:", budgetLink);
      setSearchParams(budgetLink);
      // setParams(budgetLink);
      return budgetLink;
    } else {
      console.log("Service not found for id:", id);
      return null; // or handle the case where the service is not found
    }
  }

  //REORDERING
  function orderAZ() {
    setAllBudgets((prevAllBudgets) => {
      const budgetsAZ = [...prevAllBudgets].sort((a, b) =>
        a.userName.toLowerCase() > b.userName.toLowerCase() ? 1 : -1
      );
      console.log("reorder", budgetsAZ);

      return budgetsAZ;
    });
  }
  function orderDate() {
    setAllBudgets((prevAllBudgets) => {
      const budgetsDate = [...prevAllBudgets].sort((a, b) => {
        if (a.userDate[0] === b.userDate[0]) {
          if (a.userDate[1] === b.userDate[1]) {
            return a.userDate[2] > b.userDate[2]
              ? 1
              : a.userDate[2] < b.userDate[2]
              ? -1
              : 0;
          }
          return a.userDate[1] > b.userDate[1]
            ? 1
            : a.userDate[1] < b.userDate[1]
            ? -1
            : 0;
        } else {
          return a.userDate[0] > b.userDate[0]
            ? 1
            : a.userDate[0] < b.userDate[0]
            ? -1
            : 0;
        }
      });
      return budgetsDate;
    });
  }

  function firstOrder() {
    setAllBudgets(initialOrder);
    return allBudgets;
  }

  const renderedBudgets = allBudgets
    .filter((userService) => {
      return search.toLowerCase() === ""
        ? userService
        : userService.userName.toLowerCase().includes(search.toLowerCase());
    })
    .map((userService) => {
      return (
        <div
          className="budget"
          key={userService.userId}
          onClick={() => getBudgetLink(null, userService.userId)}
        >
          <div className="budget_contact">
            <h3>{userService.userName}</h3>
            <p>{userService.userPhone}</p>
            <p>{userService.userEmail}</p>
          </div>
          <div>
            <h4>Serveis contractats:</h4>
            {userService.userServices.map((service) => {
              return (
                <ul className="services_list">
                  <li>
                    ·{service.serviceName}
                    {service.servicePages > 0 &&
                    service.serviceLanguages > 0 ? (
                      <span>
                        {" "}
                        ({service.servicePages} pàgines,{" "}
                        {service.serviceLanguages} llenguatges)
                      </span>
                    ) : service.servicePages > 0 &&
                      service.serviceLanguages === 0 ? (
                      <span> ({service.servicePages} pàgines)</span>
                    ) : service.servicePages === 0 &&
                      service.serviceLanguages > 0 ? (
                      <span> ({service.serviceLanguages} llenguatges)</span>
                    ) : null}
                  </li>
                </ul>
              );
            })}
          </div>
          <div>
            <h3>Total:</h3>
            <p>{userService.userTotal}</p>
          </div>
        </div>
      );
    });

  //NewBudget END

  //COUNT PAGES AND LANGUAGES START
  const pages = 0;
  const languages = 0;

  function pagesLanguages(e, id) {
    //not working but not throwing error
    const { name, value } = e.target;
    setServices((prevServices) => {
      return prevServices.map((service) => ({
        ...service,
        [name]: value,
      }));
    });
  }

  function increaseLanguages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service, id) => {
        if (service.serviceIndex === id) {
          return {
            ...service,
            serviceLanguages: service.serviceLanguages + 1,
          };
        }
        return service;
      });
    });
    calcBudget(services);
  }
  function increasePages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service, id) => {
        if (service.serviceIndex === id) {
          return {
            ...service,
            servicePages: service.servicePages + 1,
          };
        }
        return service;
      });
    });
    calcBudget(services);
  }

  function decreaseLanguages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service, id) => {
        if (service.serviceIndex === id) {
          return {
            ...service,
            serviceLanguages:
              service.serviceLanguages === 0 ? 0 : service.serviceLanguages - 1,
          };
        }
        return service;
      });
    });
    calcBudget(services);
  }

  function decreasePages(e, id) {
    setServices((prevServices) => {
      return prevServices.map((service, id) => {
        if (service.serviceIndex === id) {
          return {
            ...service,
            servicePages:
              service.servicePages === 0 ? 0 : service.servicePages - 1,
          };
        }
        return service;
      });
    });
    calcBudget(services);
  }
  //COUNT PAGES AND LANGUAGES END

  //MODAL START

  const [show, setShow] = useState(false);
  function showModal() {
    setShow(true);
  }

  const [modalText, setModalText] = useState("");
  function toggleModal(text) {
    setShow((prevShow) => !prevShow);
    if (text === "toggleLanguages") {
      setModalText(
        <div>
          <h4>Número de llenguatges</h4>
          <p>Afegeix els llenguatges que tindrà el teu projecte.</p>
          <p>El cost de cada llenguatge és de 30€.</p>
        </div>
      );
    }

    if (text === "togglePages") {
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

  //MODAL END
  //ANNUAL START
  const [annual, setAnnual] = useState(false);
  const [checked, setChecked] = useState(false);

  function annualOrMonthly() {
    console.log("annualOrMonthly fired");

    setChecked((prevChecked) => !prevChecked);
    setAnnual((prevAnnual) => !prevAnnual);

    console.log("annual", annual, "checked", checked);
  }

  //ANNUAL END

  useEffect(() => {
    setCurrentServices((prevCurrentServices) => {
      return (prevCurrentServices = services.filter(
        (service) => service.isChecked === true
      ));
    });
  }, [services]);

  useEffect(() => {
    calcBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, currentServices]);

  return (
    <>
      <servicesContext.Provider
        value={{
          services,
          setServices,
          calcBudget,
          handleChecked,
          currentServices,
          setCurrentServices,
        }}
      >
        <budgetContext.Provider
          value={{
            budget,
            setBudget,
            servicesPicked,
            setServicesPicked,
            calcBudget,
          }}
        >
          <userServiceContext.Provider
            value={{
              userService,
              allBudgets,
              search,
              setSearch,
              orderDate,
              firstOrder,
              orderAZ,
              renderedBudgets,
              newBudget,
            }}
          >
            <addPagesLanguagesContext.Provider
              value={{
                decreaseLanguages,
                decreasePages,
                pagesLanguages,
                increaseLanguages,
                increasePages,
                pages,
                languages,
              }}
            >
              <modalContext.Provider
                value={{
                  show,
                  setShow,
                  showModal,
                  toggleModal,
                  modalText,
                  setModalText,
                  handleClose,
                }}
              >
                <annualContext.Provider
                  value={{ annual, checked, annualOrMonthly }}
                >
                  {children}
                </annualContext.Provider>
              </modalContext.Provider>
            </addPagesLanguagesContext.Provider>
          </userServiceContext.Provider>
        </budgetContext.Provider>
      </servicesContext.Provider>
    </>
  );
}

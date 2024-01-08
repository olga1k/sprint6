import { useAddPagesLanguagesContext, useServicesContext, useModalContext } from "./NewProvider";
import { FaQuestionCircle } from "react-icons/fa";

export default function Extra() {
  const { services } = useServicesContext();
  const {decreaseLanguages, decreasePages, pagesLanguages, increaseLanguages, increasePages} = useAddPagesLanguagesContext();
  const {toggleModal} = useModalContext();

  
  return (
  <div className="extra"> 
  <div>
    <FaQuestionCircle onClick={() => toggleModal("togglePages")} />
    Nombre de pàgines
    <button
      className="btn_minus"
      id={crypto.randomUUID()}
      onClick={(e) => decreasePages(e)}
    >
      -
    </button>
    <input
      type="number"
      name="servicePages"
      value={
        services.find((service) => service.serviceName === "Web")?.servicePages
      }
      className="num"
      onChange={(e, id) => pagesLanguages(e, id)}
    />
    <button
      className="btn_plus"
      id={crypto.randomUUID()}
      onClick={(e) => increasePages(e)}
    >
      +
    </button>
  </div>

  <div>
    <FaQuestionCircle onClick={() => toggleModal("toggleLanguages")} />
    Nombre de llenguatges
    <button
      className="btn_minus"
      id={crypto.randomUUID()} //may need deleting
      onClick={(e) => decreaseLanguages(e)}
    >
      -
    </button>
    <input
      type="number"
      name="serviceLanguages"
      value={
        services.find((service) => service.serviceName === "Web")?.serviceLanguages
      }
      className="num"
      onChange={(e, id) => pagesLanguages(e, id)}
    />
    <button
      className="btn_plus"
      id={crypto.randomUUID()} //may need deleting
      onClick={(e) => increaseLanguages(e)}

    >
      +
    </button>
  </div>
</div>
  );
}

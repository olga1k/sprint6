import Extra from "./Extra";
import Offer from "./Offer";
import { useServicesContext, useAnnualContext } from "./NewProvider";

export default function Service() {
  const { services, handleChecked } = useServicesContext();
  const { annual } = useAnnualContext();
  const newServices = services.map((service, index) => {
    return (
      <div
        key={service.id}
        className={`service_card ${service.isChecked ? "color" : ""} ${
          service.serviceName === "Web" && service.isChecked ? "height" : ""
        }`}
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
              value={service.serviceName}
              type="checkbox"
              id={service.id}
              onChange={(e) => handleChecked(service.id, e.target.checked)}
              checked={service.isChecked}
              name="isChecked"
            />
          </div>
        </div>

        {service.isChecked && service.serviceName === "Web" && (
          <Extra id={service.id} />
        )}
      </div>
    );
  });

  return (
    <div className="service_box">
      <div>{newServices}</div>
    </div>
  );
}

import { useUserServiceContext } from "./NewProvider";
import { FaSearch } from "react-icons/fa";
export default function NewBudget() {
  const {
    setSearch,
    orderDate,
    firstOrder,
    orderAZ,
    renderedBudgets,
    newBudget,
  } = useUserServiceContext();

  return (
    <>
      <div className="create_budget">{newBudget}</div>
      <div className="btns_wrapper">
        <h2>Pressupostos en curs: </h2>
        <div className="reorder_wrapper">
          <div className="order_search">
            <input
              type="text"
              name="searchUser"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch onChange={(e) => setSearch(e.target.value)} />

            <div className="reorder_btns">
              <button onClick={orderDate}>Data</button>
              <button onClick={firstOrder}>Import</button>
              <button onClick={orderAZ}>Nom</button>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>
      <div className="new_budgets">{renderedBudgets}</div>
    </>
  );
}

import { useBudgetContext } from "./NewProvider";

export default function Budget(props) {
  const {budget} = useBudgetContext();
  return (
      <div className="budget_box">
        Preu pressuposat: <span className="budget_price">{budget}</span>
      </div>
  );
}

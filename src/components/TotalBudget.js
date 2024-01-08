import { useBudgetContext } from "./NewProvider"
export function TotalBudget() {
const { budget } = useBudgetContext();
    return (
        <div className="budget_total">
          Preu pressuposat: <span className="total">{budget}</span>
        </div>
    )
}
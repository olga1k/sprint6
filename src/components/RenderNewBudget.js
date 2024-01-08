import NewBudget from "./NewBudget";
import Reorder from "./Reorder";
export default function RenderNewBudget() {

    return (
        <>
        <Reorder />
        <div className="budgets">
            <NewBudget />

        </div>
        </>
    )
}
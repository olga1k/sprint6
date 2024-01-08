import { useAnnualContext } from "./NewProvider"
export function ToggleSwitch() {
    const { annual, annualOrMonthly, checked } = useAnnualContext();

    return(
    <>
    <label className="toggle_label">
    <input type="checkbox" 
    checked={checked}
    onChange={annualOrMonthly}/>
        <span className="slider"></span>
    </label>
    </>
    )
}
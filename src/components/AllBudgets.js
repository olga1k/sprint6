export default function AllBudgets({userService}) {
    const [allServices, setAllServices] = useState([]);


    function submitForm(e) {
        e.preventDefault();
        console.log("submit form");
        setAllServices(prevAllServices => 
            [...prevAllServices,
                userService])
                console.log(allServices, "allServices")
    
    
      }

    const allServicesRendered = allServices.map(service => {
        return (<div>
            <div className="budget_user">
                <h3 className="budget_user_name">{service.userName}</h3>
                <p>{service.userPhone}</p>
                <p>{service.userEmail}</p>
            </div>
            <div className="budget_services"></div>
            <div className="budget_"></div>

        </div>

        )
    })

    return (
        <div>
            <div>{allServicesRendered}</div>
        </div>

    )

}
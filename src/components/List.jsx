import "./List.css";

const List = (props) => {

    const { dataList, onSearch } = props;

    return(
        <div className="list">
            <input type="search" className="search-filter" id="search-filter" placeholder="Enter Recipe Name"></input>
            <label id="range-label-start">Health Score - 0</label>
            <input type="range" className="range-filter" id="range-filter" min="0" max="100" step="10"></input>
            <label id="range-label-end">100</label>
            
            <button onClick={onSearch}>Search</button>
            {(dataList.length !== 0) ? <table className="table-recipes">
                <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Health Score</th>
                        <th>Price ($ Per Serving)</th>
                        <th>Prep Time (Minutes)</th>
                        <th>Diets</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList && dataList.map((data) => (
                    <tr className="recipe-entry" id={data.title}>  
                        <td>{data.title}</td> 
                        <td>{data.healthScore}</td>
                        <td>{data.pricePerServing}</td>
                        <td>{data.readyInMinutes}</td>
                        <td>{data.diets.join(", ")}</td>
                    </tr>
                    ))}
                </tbody>
            </table> : <h3>NO RESULTS SHOWN</h3>
            }
            
        </div>
    );
};

export default List;
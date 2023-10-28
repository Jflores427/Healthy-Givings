import "./Home.css"

import Card from "./Card";
import List from "./List";
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';

const Home = (props) => {

    const { recipes, displayedRecipes, numOfRecipes, avgPrice, avgReadyTime, dishType, onSearch } = props;

    return (
         <div className="overall-container" >
            <div className="main-container">
                <div className="card-container">
                    <Card 
                    data={numOfRecipes}
                    dataDescription="Total Recipes"
                    />
                    <Card 
                    data={"$"+ avgPrice.toFixed(2)}
                    dataDescription="Average Recipe Price"
                    />
                    <Card 
                    data={avgReadyTime}
                    dataDescription="Average Ready Time (Minutes)"
                    />
                    <Card 
                    data={dishType.toUpperCase()}
                    dataDescription="Most Seen Dish Type"
                    />
                </div>

                <div className="list-visual-container">
                    <div className="list-container">
                        <List 
                        dataList={displayedRecipes}
                        onSearch={onSearch}
                        />
                    </div>
                    <div className="visual-container">
                        <div className="line-graph-container">
                            <LineGraph 
                            data={recipes}
                            />
                        </div>
                        <br></br>
                        <div className="bar-graph-container">
                            <BarGraph 
                            data={recipes}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Home;
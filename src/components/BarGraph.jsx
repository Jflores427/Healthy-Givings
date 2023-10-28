import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend } from 'recharts';
import "./BarGraph.css";

const BarGraph = (props) => {

    let { data } = props;

    if(data) {
        data = data.map((entry) =>  ({...entry, totalPrice : (entry.pricePerServing / 100).toFixed(2) }))
    }  
    
    return(
        <div className="bar-graph">
            <h3>Health Score vs. Total Price ($ Per Serving) </h3>
            <BarChart width={600} height={200} data={data} margin={{ top: 0, right: 0, bottom: 25, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="healthScore" >
                    <Label value="Health Score" offset={-10} position="insideBottom" />
                </XAxis>
                <YAxis dataKey="totalPrice" domain={[0, dataMax => (dataMax * 2)]}/>
                <Tooltip  />

                <Bar dataKey="totalPrice" fill="#00CC00"  />
            </BarChart>
        </div>
    );
};

export default BarGraph;
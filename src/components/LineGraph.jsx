import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';
import "./LineGraph.css";

const LineGraph = (props) => {

    const { data } = props;

    return(
        <div className="line-graph">
            <h3>Health Score vs. Weight Watcher Smart Points</h3>
            <LineChart width={600} height={255} data={data} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                <Line type="monotone" dataKey="weightWatcherSmartPoints" stroke="#00CC00" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="healthScore">
                    <Label value="Health Score" offset={-10} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
};

export default LineGraph;
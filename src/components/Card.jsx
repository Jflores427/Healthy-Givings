import "./Card.css";

const Card = (props) => {

    const { data, dataDescription } = props;
    return (
        <div className="card">
            <div className="data">{data}</div>
            <div className="data-description">{dataDescription}</div>
        </div>
    );
};

export default Card;
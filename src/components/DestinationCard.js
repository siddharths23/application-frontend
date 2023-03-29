import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "../css/DestinationCard.css";
const DestinationCard = ({ destination }) => {
  return (
    <Card className="destination-card">
      <CardBody>
        <CardTitle className="destination-card-title">
          {destination.title}
        </CardTitle>
        <CardText className="destination-card-text">
          {destination.description}
        </CardText>
        <ul className="destination-card-list">
          {destination.dayPlans.map((plan, index) => (
            <li key={index} className="destination-card-list-item">
              {plan}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dayPlans: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DestinationCard;

import { Button } from "antd";
import "./ActionCard.scss";

const ActionCard = ({ icon, title, description, ctaText, onClick }) => {
  return (
    <div className="action-card">
      <div className="action-card__content">
        <div className="action-card__icon">{icon}</div>
        <div className="action-card__text">
          <h3 className="action-card__title">{title}</h3>
          <p className="action-card__description">{description}</p>
        </div>
      </div>
      <Button type="secondary" onClick={onClick}>
        {ctaText}
      </Button>
    </div>
  );
};

export default ActionCard;

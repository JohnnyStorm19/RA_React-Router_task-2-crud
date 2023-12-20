import { Link, useParams } from "react-router-dom";
import classes from "./Card.module.css";
import { useFetchCardInfo } from "../../hooks/useFetchCardInfo";

const Card = () => {
  const { id } = useParams();

  const [{ cardData, date, recievedIndex, isLoading, error }] =
    useFetchCardInfo(id as string);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error!!!</div>}
      {cardData && date && (
        <div className={classes.card}>
          <Link to={"/"} className={classes.link__back}></Link>
          <header className={classes.card__header}>
            <h2 className={classes.card__title}>
              Card #
              {(recievedIndex || recievedIndex === 0) && recievedIndex + 1}
            </h2>
            <span>{`${date.day}.${date.month}.${date.year},${date.hour}:${date.minute}`}</span>
          </header>
          <p>{cardData.content}</p>
        </div>
      )}
    </>
  );
};

export default Card;

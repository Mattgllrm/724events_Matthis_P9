import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
 const byDateDesc = data?.focus
  ? [...data.focus].sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    )
  : [];

 const nextCard = () => {
  setIndex((prev) =>
    prev < byDateDesc.length - 1 ? prev + 1 : 0   // ajout d'un -1 pour effacer slide fantome
  );
};

 useEffect(() => {
  if (byDateDesc.length === 0) {
    return undefined;   // Eslint
  }

  const timer = setTimeout(() => {
    nextCard();
  }, 5000);

  return () => {
    clearTimeout(timer);
  };
}, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || event.title}>  {/* remplacer le fragment <> par une div avec key unique. On avais de base : key={event.title} */}
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((slide, radioIdx) => (    /* rajout de slide et ajout radioIdx pour point slider */
                <input
                  key={`${slide.title}-${slide.date}`}  /* clé unique pour chaque input */
                  type="radio"
                  name={`radio-button-${idx}`}        /*  nom unique par slider pour éviter collisions, point rouge */
                  checked={radioIdx === index}
                 onChange={() => setIndex(radioIdx)}     // points cliquable sur le slider
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

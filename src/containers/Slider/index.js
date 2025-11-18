import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),  // Rajout -1 pour effacer 4e slide fantome 
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || event.title}>  {/* remplacer le fragment <> par un div avec key unique. On avais de base : key={event.title} */}
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
              {byDateDesc.map((slide, radioIdx) => (    /* rajout de slide au lieu de _ et ajout radioIdx pour point slider */
                <input
                  key={`${slide.title}-${slide.date}`}  /* clé unique pour chaque input */
                  type="radio"
                  name={`radio-button-${idx}`}        /*  nom unique par slider pour éviter collisions */
                  checked={radioIdx === index}
                  readOnly                              /*  ajout readOnly pour éviter warning React sur input contrôlé */
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

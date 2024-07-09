import Card from "./Card.jsx";
import developers from "./developers-data.js";

const CardContainer = () => {
  return (
    <div className="flex flex-wrap justify-center w-4/5 mx-auto">
      {developers.map(
        (
          developer,
          index 
        ) => (
          <div className="m-4" key={index}>
            <Card
              name={developer.name}
              position={developer.position}
              imageUrl={developer.imageUrl}
              linkedin={developer.linkedin}
              github={developer.github}
              mail={developer.mail} 
            />
          </div>
        )
      )}
    </div>
  );
};

export default CardContainer;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Card = ({ name, position, imageUrl, linkedin, github }) => {
  const redirectToLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 text-gray-700"
      style={{ minWidth: "250px", backgroundColor: "#001728" }}
    >
      <img
        className="w-32 h-32 mx-auto rounded-full mt-4"
        src={imageUrl}
        alt={name}
      />
      <div className="px-6 py-4" style={{ color: "#f7f7f8" }}>
        <div className="font-bold text-xl mb-2 text-center">{name}</div>
        <p className="text-base text-center">{position}</p>
      </div>
      <div className="px-6 py-4 flex justify-center gap-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-200 cursor-pointer flex items-center justify-center transition duration-300 ease-in-out hover:bg-green-600"
          onClick={() => redirectToLink(linkedin)}
          style={{ width: "38px", height: "38px", backgroundColor: "#f7f7f8" }}
        >
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "24px" }} />
        </span>
        <span
          className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-200 cursor-pointer flex items-center justify-center transition duration-300 ease-in-out hover:bg-green-600"
          onClick={() => redirectToLink(github)}
          style={{ width: "38px", height: "38px", backgroundColor: "#f7f7f8" }}
        >
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: "24px" }} />
        </span>
      </div>
    </div>
  );
};

export default Card;

import { Link } from "react-router";

type CardLinkProps = {
  icone: string;
  titulo: string;
  link: string;
}

export const CardLink = ({ icone, titulo, link }: CardLinkProps) => {
  return (
    <Link to={link} className="text-decoration-none my-3 align-items-center d-inline-flex flex-column">
      <div className="link rounded-circle text-center d-inline-block p-3">
        <i className={`bi ${icone} fs-4`}></i>
      </div>
      <span className="text-dark mx-auto">{titulo}</span>
    </Link>
  )
}
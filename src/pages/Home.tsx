import { CardLink } from "../components/CardLink";
import { HomeSection } from "../components/HomeSection";


export const Home = () => {
  return (
    <>
      <HomeSection titulo="Cadastros">
        <CardLink icone={"bi-bookmarks"} titulo={"Editora"} link={"publisher-register"} />
        <CardLink icone={"bi-vector-pen"} titulo={"Autor"} link={"autor-register"} />
        <CardLink icone={"bi-journal-bookmark"} titulo={"Livro"} link={""} />
        <CardLink icone={"bi-person-heart"} titulo={"Cliente"} link={"cliente-register"} />
        <CardLink icone={"bi-person-lines-fill"} titulo={"Funcionário"} link={"funcionario-register"} />
        <CardLink icone={"bi-door-open"} titulo={"Sala"} link={""} />
      </HomeSection>
      <HomeSection titulo="Relatórios">
        <CardLink icone={"bi-clock"} titulo={"Horários Livres"} link={""} />
        <CardLink icone={"bi-person-vcard"} titulo={"Reservas"} link={""} />
        <CardLink icone={"bi-calendar4-week"} titulo={"Livros Alugados por Cliente"} link={"aluguel-cliente"} />
        <CardLink icone={"bi-person-video2"} titulo={"Livros Alugados por Autor"} link={"aluguel-autor"} />
        <CardLink icone={"bi-journal-bookmark"} titulo={"Livro"} link={"livro-register"} />
        <CardLink icone={"bi-person-heart"} titulo={"Cliente"} link={""} />
        <CardLink icone={"bi-person-lines-fill"} titulo={"Funcionário"} link={""} />
        <CardLink icone={"bi-door-open"} titulo={"Sala"} link={"sala-register"} />
      </HomeSection>
      <HomeSection titulo="Relatórios">
        <CardLink icone={"bi-clock"} titulo={"Salas Refrigeradas"} link={"salas-refrigeradas"} />
        <CardLink icone={"bi-person-vcard"} titulo={"Salas por Tempo"} link={"salas-por-tempo"} />
        <CardLink icone={"bi-calendar4-week"} titulo={"Aluguel"} link={""} />
        <CardLink icone={"bi-person-video2"} titulo={"Livros por Autor"} link={""} />
        <CardLink icone={"bi-pencil-square"} titulo={"Editora por Autor"} link={""} />
        <CardLink icone={"bi-chat-dots"} titulo={"Feedbacks"} link={""} />
      </HomeSection>
      <HomeSection titulo="Processos">
        <CardLink icone={"bi-chat-dots"} titulo={"Feedback de Reserva"} link={"feedback"} />
        <CardLink icone={"bi-calendar4-week"} titulo={"Aluguel de Livros"} link={"aluguel"} />
        <CardLink icone={"bi-ticket-perforated"} titulo={"Reserva de Leitura"} link={""} />
        <CardLink icone={"bi-calendar4-week"} titulo={"Aluguel de Livros"} link={""} />
        <CardLink icone={"bi-ticket-perforated"} titulo={"Reserva de Leitura"} link={"reserva-register"} />
      </HomeSection>

      <section className="image-section rounded-5 align-items-center mt-5 p-2">
        <img src="/alice.png" alt="alice, coelho e chapeleiro maluco tomando chá" className="mb-0 px-5" />
        <p className="fs-3 fw-bold mx-auto"><span className="d-block">2023 year 50 most</span>popular bestseller</p>
      </section>

    </>
  );
};

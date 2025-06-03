
type HomeSectionProps = {
  titulo: string;
  children?: React.ReactNode;
}

export const HomeSection = ({ titulo, children }: HomeSectionProps) => {
  return (
    <>
      <span className="nome-sistema lead fw-bold fs-3">{titulo}</span>
      <section className="home-section rounded-5 my-2 p-2">
        {children}
      </section>
    </>
  )
}
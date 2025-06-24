
export const Sidebar = () => {
  return (
    <>
      <aside className="container d-inline-block h-100 mx-0 mt-0" id="side-bar">
        <img src={`${import.meta.env.BASE_URL}image.png`} alt="foto-perfil" className="border border-2 border-light rounded-circle" id="imagem-perfil" />
      </aside>
    </>
  )
}
